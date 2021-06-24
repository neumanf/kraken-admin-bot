import { connectToDB } from "../../core/db/connect";

async function addCommandToDB(_name: string, _value: string, _groupId: number) {
    const db = await connectToDB();
    const commands = db.collection("commands");

    return await commands.updateOne(
        { name: _name, groupId: _groupId },
        {
            $set: {
                counter: /\$COUNTER/gm.test(_value) ? 0 : -1,
                value: _value,
            },
        },
        { upsert: true }
    );
}

async function deleteCommandFromDB(_name: string, _groupId: number) {
    const db = await connectToDB();
    const commands = db.collection("commands");

    return await commands.deleteOne({ name: _name, groupId: _groupId });
}

async function getCustomCommandsFromDB(_groupId: number) {
    const db = await connectToDB();
    return db.collection("commands").find({ groupId: _groupId }).toArray();
}

async function updateCustomCommand(_name: string, _counter: number) {
    const db = await connectToDB();

    return await db
        .collection("commands")
        .updateOne({ name: _name }, { $set: { counter: _counter + 1 } });
}

export {
    addCommandToDB,
    deleteCommandFromDB,
    getCustomCommandsFromDB,
    updateCustomCommand,
};
