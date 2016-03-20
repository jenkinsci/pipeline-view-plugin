package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class PauseActionMixin {

  @JsonProperty
  abstract String getCause();

  @JsonProperty
  abstract long getStartTime();

  @JsonProperty
  abstract long getEndTime();
}
