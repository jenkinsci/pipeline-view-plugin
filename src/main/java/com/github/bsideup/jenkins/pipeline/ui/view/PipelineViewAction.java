package com.github.bsideup.jenkins.pipeline.ui.view;

import hudson.Extension;
import hudson.model.Action;
import hudson.model.Api;
import jenkins.model.TransientActionFactory;
import org.jenkinsci.plugins.workflow.job.WorkflowRun;
import org.kohsuke.stapler.export.ExportedBean;

import java.util.Collection;
import java.util.Collections;

@ExportedBean
public class PipelineViewAction implements Action {

    public final WorkflowRun target;

    private PipelineViewAction(WorkflowRun job) {
        this.target = job;
    }

    @Override
    public String getDisplayName() {
        return null;
    }

    @Override
    public String getUrlName() {
        return "pipeline-view";
    }

    @Override
    public String getIconFileName() {
        return null;
    }

    public Api getApi() {
        return new PipelineViewApi(target);
    }

    @Extension
    public static class Factory extends TransientActionFactory<WorkflowRun> {

        @Override
        public Class<WorkflowRun> type() {
            return WorkflowRun.class;
        }

        @Override
        public Collection<? extends Action> createFor(WorkflowRun target) {
            return Collections.singleton(new PipelineViewAction(target));
        }
    }
}