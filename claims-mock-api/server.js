const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

// Custom Login Route
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = router.db.get('users').value();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.jsonp({ token: 'dummy-token-123', user });
    } else {
        res.status(401).jsonp({ error: 'Invalid credentials' });
    }
});

// Custom Signup Route
server.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = router.db.get('users').value();
    if (users.find(u => u.username === username)) {
        return res.status(400).jsonp({ error: 'Username already exists' });
    }
    const newUser = { id: Date.now(), username, password };
    router.db.get('users').push(newUser).write();
    res.status(201).jsonp(newUser);
});

// Middleware to Protect Routes
server.use((req, res, next) => {
  if (req.path === "/users" && req.method === "GET") {
    console.log(req.path)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer dummy-token") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  next();
});

// Dashboard Metrics Endpoint
server.get('/dashboard-metrics', (req, res) => {
    const claims = router.db.get('claims').value();
    const totalClaims = claims.length;
    const approvedClaims = claims.filter(c => c.status === 'approved');
    const totalApproved = approvedClaims.length;
    const approvedAmount = approvedClaims.reduce((sum, c) => sum + c.claimAmount, 0);
    const pendingClaims = claims.filter(c => c.status === 'pending').length;
    
    res.jsonp({
        totalClaims,
        totalApproved,
        approvedAmount,
        pendingClaims
    });
});

// Report Generation Endpoint
server.get('/reports', (req, res) => {
    const { status } = req.query;
    let reportData = router.db.get('claims').value();
    if (status) {
        reportData = reportData.filter(c => c.status === status);
    }
    res.jsonp(reportData);
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});
