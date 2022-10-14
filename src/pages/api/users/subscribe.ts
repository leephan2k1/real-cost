import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~/serverless/libs/connectDb';

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const { db } = await connectToDatabase();

    const { userId, subscription } = body;

    const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(userId) });

    if (!user) {
        return res.status(403).json({
            status: 'forbidden',
            message: `${userId} not in database`,
        });
    }

    if (!subscription) {
        return res.status(400).json({
            status: 'error',
            message: `subscription should be provided`,
        });
    }

    await db
        .collection('users')
        .updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { identifications: subscription } },
        );

    return res.status(200).json({
        status: 'success',
        message: `update subscription `,
    });
};

export default subscribe;
