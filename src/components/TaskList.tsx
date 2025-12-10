import "@picocss/pico/css/pico.min.css";
import "../index.css";
import { AutomergeUrl, useDocument } from "@automerge/react";
import {FolderComponent} from "./FolderComponent.tsx";
import React from "react";

export type CompositeFullItem = TaskItem | TaskListItem | Root;
export type CompositeItem = TaskItem | TaskListItem;

interface Item {
    title: string;
    id: number;
    parentIds: number[]
}

interface Searchable {
    identifier: 'root' | 'list' | 'item'
}

interface Container {
    tasks: CompositeItem[];
}

export class TaskItem implements Item, Searchable {
    title: string;
    id: number;
    parentIds: number[];
    identifier: 'item'

    constructor(id: number, parentIds: number[]) {
        this.title = "";
        this.id = id
        this.parentIds = parentIds;
        this.identifier = 'item'
    }
}

export class TaskListItem implements Item, Container, Searchable {
    tasks: CompositeItem[];
    title: string;
    id: number;
    parentIds: number[];
    identifier: 'list'

    constructor(id: number, parentIds: number[]) {
        this.title = "";
        this.tasks = [];
        this.id = id
        this.parentIds = parentIds;
        this.identifier = 'list'
    }
}

export class Root implements Container, Searchable {
    tasks: CompositeItem[];
    identifier: 'root'

    constructor() {
        this.tasks = [];
        this.identifier = 'root'
    }
}

export function insertNestedValue(d: Root, path: number[], insert: CompositeItem ) {
    let currentValue: CompositeFullItem = d;
    path.forEach((id) => {
        const nestedValue = getChildById(currentValue, id)
        if (nestedValue == null) {
            throw Error("ID does not exist")
        }
        currentValue = nestedValue;
    })

    currentValue.tasks.push(insert)
}

function getChildById(parent: CompositeFullItem, id: number): CompositeItem | null {
    if (parent.identifier === 'item') { return null }
    parent.tasks.forEach((task) => {
        if (task.id === id) {
            return task
        }
    })
    return null
}

export const TaskList: React.FC<{
  docUrl: AutomergeUrl;
}> = ({ docUrl }) => {
  const [doc, changeDoc] = useDocument<Root>(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renders once the document is loaded
    suspense: true,
  });

  function insert(path: number[], insert: CompositeItem) {
      changeDoc((d) => insertNestedValue(d, path, insert))
  }

  return (
    <>
      <div id="task-list">
        <div className="task">
            <FolderComponent item={doc} insert={insert} margin={0}/>
        </div>
      </div>
    </>
  );
};
