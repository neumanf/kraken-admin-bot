import { ICommand } from "../../interfaces/command";
import { IDeleteOne } from "../../interfaces/deleteOne";
import Command from "../../models/command";

async function addCommandToDB(_name: string, _value: string, _groupId: number): Promise<ICommand | null> {
    try {
        return await Command.findOneAndUpdate(
            { name: _name, groupId: _groupId },
            {
                $set: {
                    counter: /\$COUNTER/gm.test(_value) ? 0 : -1,
                    value: _value,
                },
            },
            { upsert: true },
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deleteCommandFromDB(_name: string, _groupId: number): Promise<IDeleteOne> {
    try {
        return await Command.deleteOne({ name: _name, groupId: _groupId });
    } catch (error) {
        console.error(error);
        return { n: 0, deletedCount: 0, ok: 0 };
    }
}

async function getCustomCommandsFromDB(_groupId: number): Promise<ICommand[]> {
    try {
        return await Command.find({ groupId: _groupId });
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function updateCustomCommand(_name: string, _counter: number): Promise<ICommand | null> {
    try {
        return await Command.findOneAndUpdate({ name: _name }, { $set: { counter: _counter + 1 } });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { addCommandToDB, deleteCommandFromDB, getCustomCommandsFromDB, updateCustomCommand };
