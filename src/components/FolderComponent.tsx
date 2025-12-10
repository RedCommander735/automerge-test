import {CompositeItem, insertNestedValue, Root, TaskItem, TaskListItem} from "./TaskList.tsx";
import {ChangeFn} from "@automerge/react";
import React from "react";
import {ItemComponent} from "./ItemComponent.tsx";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export const FolderComponent: React.FC<{
    item: TaskListItem | Root;
    margin: number;
    insert: (path: number[], insert: CompositeItem) => void
}> = ({ item, margin, insert }) => {
    return (
        <>
            <div id="task-list" style={{marginLeft: `${margin}px`, border: '1px solid red'}}>
                {item &&
                    item.tasks?.map((item, index) => (
                        <div className="task" key={index}>
                            {(item.identifier === 'item') ? <ItemComponent item={item} margin={margin + 20}/> : <FolderComponent item={item} insert={insert} margin={margin + 20} />}
                        </div>
                    ))}
                <button onClick={(e) => {
                    const parentIds = item.identifier === 'root' ? [] : item.parentIds;
                    const newParentIds = item.identifier === 'root' ? parentIds : parentIds.concat([item.id]);
                    insert(newParentIds, new TaskItem(item.tasks.length + 1, newParentIds))
                }}>+ Item</button>
                <button onClick={(e) => {
                    const parentIds = item.identifier === 'root' ? [] : item.parentIds;
                    const newParentIds = item.identifier === 'root' ? parentIds : parentIds.concat([item.id]);
                    insert(newParentIds, new TaskListItem(item.tasks.length + 1, newParentIds))
                }}>+ Folder</button>
            </div>
        </>
    );
};