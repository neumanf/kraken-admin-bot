import { ICommand } from "../../interfaces/command";
import Command from "../../models/command.model";
import { IDeleteOne } from "../../interfaces/delete-one";

export class CustomCommandsService {
    async findAll(groupId: number): Promise<ICommand[]> {
        return await Command.find({ groupId }).exec();
    }

    async update(groupId: number, name: string, value: string): Promise<ICommand | null> {
        return Command.findOneAndUpdate(
            { name, groupId },
            {
                $set: {
                    name,
                    counter: /\$COUNTER/gm.test(value) ? 0 : -1,
                    value,
                },
            },
            { upsert: true },
        );
    }

    async delete(groupId: number, name: string): Promise<IDeleteOne> {
        return Command.deleteOne({ name, groupId });
    }

    async updateCounter(name: string, counter: number): Promise<ICommand | null> {
        return Command.findOneAndUpdate({ name }, { $set: { counter: counter + 1 } });
    }
}
