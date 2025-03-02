import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced state
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/claims").then((res) => {
      setClaims(res.data);
      setFilteredClaims(res.data);
    });
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce time

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter claims using useMemo for optimization
  const filteredData = useMemo(() => {
    let filtered = claims;

    if (debouncedQuery) {
      filtered = filtered.filter(
        (claim) =>
          claim.diagnosisCode.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          claim.procedureCode.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((claim) => claim.status === statusFilter);
    }

    return filtered;
  }, [debouncedQuery, statusFilter, claims]);

  useEffect(() => {
    setFilteredClaims(filteredData);
    setPage(0); // Reset to first page when filtering
  }, [filteredData]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Claims List
          </Typography>

          {/* Search & Filter Inputs */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Diagnosis Code or Procedure Code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              fullWidth
              variant="outlined"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Denied">Denied</MenuItem>
            </Select>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.main" }}>
                <TableRow>
                  {["Patient Name", "Diagnosis Code", "Procedure Code", "Claim Amount", "Status"].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold", color: "white" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClaims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim) => (
                  <TableRow key={claim.id} hover onClick={() => navigate(`/claims/${claim.id}`)} sx={{ cursor: "pointer" }}>
                    <TableCell>{claim.patientName}</TableCell>
                    <TableCell>{claim.diagnosisCode}</TableCell>
                    <TableCell>{claim.procedureCode}</TableCell>
                    <TableCell>${claim.claimAmount}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            claim.status === "Approved"
                              ? "success.main"
                              : claim.status === "pending"
                              ? "warning.main"
                              : "error.main",
                          fontWeight: "bold",
                        }}
                      >
                        {claim.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredClaims.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5,10,15,25,50,100]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClaimsList;
