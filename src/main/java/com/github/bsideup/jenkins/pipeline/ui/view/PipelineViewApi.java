package com.github.bsideup.jenkins.pipeline.ui.view;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.bsideup.jenkins.pipeline.ui.view.mixins.*;
import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import hudson.model.Action;
import hudson.model.Api;
import org.jenkinsci.plugins.workflow.actions.*;
import org.jenkinsci.plugins.workflow.cps.nodes.StepNode;
import org.jenkinsci.plugins.workflow.flow.FlowExecution;
import org.jenkinsci.plugins.workflow.graph.FlowGraphWalker;
import org.jenkinsci.plugins.workflow.graph.FlowNode;
import org.jenkinsci.plugins.workflow.job.WorkflowRun;
import org.jenkinsci.plugins.workflow.steps.StepDescriptor;
import org.jenkinsci.plugins.workflow.support.actions.PauseAction;
import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;

import javax.annotation.Nullable;
import java.io.IOException;
import java.util.Comparator;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

public class PipelineViewApi extends Api {

    private static final ObjectMapper objectMapper = new ObjectMapper().setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)
            .configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false)
            .setSerializationInclusion(JsonInclude.Include.NON_NULL)
            .addMixIn(FlowNode.class, FlowNodeMixin.class)
            .addMixIn(Action.class, ActionMixin.class)
            .addMixIn(StageAction.class, StageActionMixin.class)
            .addMixIn(TimingAction.class, TimingActionMixin.class)
            .addMixIn(LabelAction.class, LabelActionMixin.class)
            .addMixIn(PauseAction.class, PauseActionMixin.class)
            .addMixIn(WorkspaceAction.class, WorkspaceActionMixin.class)
            .addMixIn(ThreadNameAction.class, ThreadNameActionMixin.class)
            .addMixIn(StepNode.class, StepNodeMixin.class)
            .addMixIn(StepDescriptor.class, StepDescriptorMixin.class);

    private final WorkflowRun target;

    public PipelineViewApi(WorkflowRun target) {
        super(target);
        this.target = target;
    }

    public void doNodes(StaplerRequest req, StaplerResponse rsp) throws IOException {
        rsp.setContentType("application/json");

        SortedSet<FlowNode> sortedNodes = new TreeSet<FlowNode>(new Comparator<FlowNode>() {
            public int compare(FlowNode node1, FlowNode node2) {
                int x = parseIota(node1);
                int y = parseIota(node2);
                return (x < y) ? -1 : ((x == y) ? 0 : 1);
            }

            private int parseIota(FlowNode node) {
                try {
                    return Integer.parseInt(node.getId());
                } catch (NumberFormatException e) {
                    return 0;
                }
            }
        });

        FlowExecution execution = target.getExecution();

        Iterables.addAll(sortedNodes, new FlowGraphWalker(execution));

        objectMapper.writeValue(rsp.getWriter(), Iterables.transform(sortedNodes, new Function<FlowNode, Map>() {
            @Override
            public Map apply(@Nullable FlowNode flowNode) {
                Map result = objectMapper.convertValue(flowNode, Map.class);
                result.put("@class", flowNode.getClass().getCanonicalName());
                return result;
            }
        }));
    }

}
