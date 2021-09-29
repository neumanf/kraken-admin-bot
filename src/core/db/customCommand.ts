import { ICommand } from "../../interfaces/command";
import { IDeleteOne } from "../../interfaces/deleteOne";
import Command from "../../models/command";

async function addCommandToDB(_name: string, _value: string, _groupId: number): Promise<ICommand | null> {
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
}

async function deleteCommandFromDB(_name: string, _groupId: number): Promise<IDeleteOne> {
    return await Command.deleteOne({ name: _name, groupId: _groupId });
}

async function getCustomCommandsFromDB(_groupId: number): Promise<ICommand[]> {
    return Command.find({ groupId: _groupId });
}

async function updateCustomCommand(_name: string, _counter: number): Promise<ICommand | null> {
    return await Command.findOneAndUpdate({ name: _name }, { $set: { counter: _counter + 1 } });
}

export { addCommandToDB, deleteCommandFromDB, getCustomCommandsFromDB, updateCustomCommand };
