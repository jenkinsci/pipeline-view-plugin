package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class StageActionMixin {

  @JsonProperty
  abstract String getStageName();
}
