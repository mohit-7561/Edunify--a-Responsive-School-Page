import { IncomingForm } from 'formidable';
import path from 'path';
import connection from './db'; // Adjust the path as necessary

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser
  },
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    connection.query('SELECT * FROM schools', (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query error' });
        return;
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    // Handle POST request
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'schoolImages'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10 MB file size limit
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      console.log('Form Fields:', fields);
      console.log('Form Files:', files);

      const image = files.image && files.image[0] ? files.image[0].newFilename : null; // Get the new filename of the uploaded image

      const { name, address, city, state, zip, contact, email_id } = fields;

      // Ensure all fields are properly processed
      const query = `INSERT INTO schools (name, address, city, state, zip, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [name, address, city, state, zip || null, contact || null, image, email_id];

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Database error' });
          return;
        }

        res.status(200).json({ message: 'School added successfully' });
      });
    });
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
