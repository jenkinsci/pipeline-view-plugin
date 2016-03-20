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
    private final WorkflowRun target;

    public PipelineViewApi(WorkflowRun target) {
        super(target);
        this.target = target;
    }

    public void doNodes(StaplerRequest req, StaplerResponse rsp) throws IOException {
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE);
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        objectMapper.addMixIn(FlowNode.class, FlowNodeMixin.class);
        objectMapper.addMixIn(Action.class, ActionMixin.class);
        objectMapper.addMixIn(StageAction.class, StageActionMixin.class);
        objectMapper.addMixIn(TimingAction.class, TimingActionMixin.class);
        objectMapper.addMixIn(LabelAction.class, LabelActionMixin.class);
        objectMapper.addMixIn(PauseAction.class, PauseActionMixin.class);
        objectMapper.addMixIn(WorkspaceAction.class, WorkspaceActionMixin.class);
        objectMapper.addMixIn(ThreadNameAction.class, ThreadNameActionMixin.class);
        objectMapper.addMixIn(StepNode.class, StepNodeMixin.class);
        objectMapper.addMixIn(StepDescriptor.class, StepDescriptorMixin.class);

        rsp.setContentType("application/json");

        SortedSet<FlowNode> sortedNodes = new TreeSet<>(new Comparator<FlowNode>() {
            public int compare(FlowNode node1, FlowNode node2) {
                return Integer.compare(parseIota(node1), parseIota(node2));
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
