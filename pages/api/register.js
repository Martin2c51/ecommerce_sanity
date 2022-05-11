import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { signToken } from '../../lib/auth';

const handler = nc();

handler.post(async(res, res) => {
    const projectId = "a2wj1eu4"
    const dataset = "production"
    const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_TOKEN
    const createMutations = [
        {
          create: {
            _type: 'user',
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            isAdmin: false,
          },
        },
      ];
      
      const { data } = await axios.post(
        `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
        { mutations: createMutations },
        {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${tokenWithWriteAccess}`,
            },
        }
        );
        const userId = data.results[0].id;
        const user = {
            _id: userId,
            name: req.body.name,
            email: req.body.email,
            isAdmin: false,
        };
        const token = signToken(user);
        res.send({ ...user, token });
});

export default handler;