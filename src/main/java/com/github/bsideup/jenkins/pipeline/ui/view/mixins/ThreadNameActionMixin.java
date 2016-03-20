package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class ThreadNameActionMixin {

  @JsonProperty
  abstract String getThreadName();
}
