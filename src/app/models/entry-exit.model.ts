import { TypeEntry } from "../enum/shared.enum";

export class EntryExit {
    constructor(
        public description: string,
        public mount: number,
        public type: TypeEntry,
        public uid?: string,
    ) { }
}