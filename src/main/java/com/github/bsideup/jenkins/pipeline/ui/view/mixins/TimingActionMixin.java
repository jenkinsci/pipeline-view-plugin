package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class TimingActionMixin {

  @JsonProperty
  abstract long getStartTime();
}
