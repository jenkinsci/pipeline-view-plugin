import { Record, List, Maybe, Any } from "typed-immutable";

export default class FlowNodeRecord extends Record({
    id: String,
    running: Boolean,
    parentIds: List(String),
    typeDisplayName: String,
    "@class": String,
    descriptor: Maybe(Record({ id: String })),
    allActions: List(Any)
}) {

    getAction(className) {
        return this.allActions.find(it => it.get("@class") == className);
    }
};
