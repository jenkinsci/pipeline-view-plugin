package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.jenkinsci.plugins.workflow.steps.StepDescriptor;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY)
public abstract class StepNodeMixin {

  @JsonProperty
  abstract StepDescriptor getDescriptor();
}
