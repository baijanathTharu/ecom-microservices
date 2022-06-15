// nextjs api route

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { name } = body;
    return res.status(200).json({ name });
  }
  res.status(200).json({ message: 'Hello World!' });
}
