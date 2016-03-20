package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY)
public abstract class ActionMixin {
}
