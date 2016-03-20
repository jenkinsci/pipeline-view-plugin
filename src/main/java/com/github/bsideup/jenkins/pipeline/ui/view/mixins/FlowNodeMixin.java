package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import hudson.model.Action;

import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY)
public abstract class FlowNodeMixin {

  @JsonProperty
  abstract List<String> getParentIds();

  @JsonProperty
  abstract String getId();

  @JsonProperty
  abstract List<? extends Action> getAllActions();

  @JsonProperty
  abstract boolean isRunning();

  @JsonProperty
  abstract String getTypeDisplayName();

}
