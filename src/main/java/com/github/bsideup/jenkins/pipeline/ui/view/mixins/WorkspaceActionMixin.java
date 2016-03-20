package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class WorkspaceActionMixin {

  @JsonProperty
  abstract String getNode();

  @JsonProperty
  abstract String getPath();
}
