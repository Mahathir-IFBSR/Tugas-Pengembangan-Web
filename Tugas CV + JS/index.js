const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`); // log setiap permintaan

    // Tangani permintaan untuk file CSS
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
        try {
            const cssPath = path.join(__dirname, req.url);
            const cssData = fs.readFileSync(cssPath);
            res.statusCode = 200;
            res.end(cssData);
        } catch (err) {
            res.statusCode = 404;
            res.end('CSS file not found');
        }
        return;
    }

    // Tangani permintaan untuk file gambar (png, jpg, jpeg, gif)
    if (req.url.match(/\.(png|jpg|jpeg|gif)$/)) {
        const ext = path.extname(req.url).toLowerCase();
        const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif'
        };
        try {
            const imgPath = path.join(__dirname, req.url);
            const imgData = fs.readFileSync(imgPath);
            res.statusCode = 200;
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.end(imgData);
        } catch (err) {
            res.statusCode = 404;
            res.end('Image not found');
        }
        return;
    }

    // Default: tampilkan index.html
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    try {
        const data = fs.readFileSync(path.join(__dirname, 'index.html'));
        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.end('Error loading index.html');
    }
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
