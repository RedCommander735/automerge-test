import {TaskItem, TaskListItem} from "./TaskList.tsx";
import {ChangeFn} from "@automerge/react";

export const ItemComponent: React.FC<{
    item: TaskItem;
    margin: number
    index?: number;
    changeDoc?: (changeFn: ChangeFn<TaskListItem>, options?: (never | undefined)) => void;
}> = ({ item, margin }) => {
    return (
        <>
            <p style={{marginLeft: `${margin}px`}}>{item.id}</p>
        </>
    );
};