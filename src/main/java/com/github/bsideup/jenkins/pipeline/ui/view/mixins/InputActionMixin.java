package com.github.bsideup.jenkins.pipeline.ui.view.mixins;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class InputActionMixin {

    @JsonProperty
    private List<String> ids;
}
