import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ClaimDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/claims/${id}`).then((res) => {
      setClaim(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleUpdateStatus = (newStatus) => {
    setUpdating(true);
    axios
      .patch(`http://localhost:3001/claims/${id}`, { status: newStatus })
      .then((res) => {
        setClaim(res.data);
        setUpdating(false);
      });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Claim Details
          </Typography>

          <Typography variant="body1" mb={1}>
            <strong>Patient Name:</strong> {claim.patientName}
          </Typography>

          <Typography variant="body1" mb={1}>
            <strong>Diagnosis Code:</strong> {claim.diagnosisCode}
          </Typography>

          <Typography variant="body1" mb={1}>
            <strong>Procedure Code:</strong> {claim.procedureCode}
          </Typography>

          <Typography variant="body1" mb={1}>
            <strong>Claim Amount:</strong> ${claim.claimAmount}
          </Typography>

          <Typography variant="body1" mb={2}>
            <strong>Status:</strong>{" "}
            <Chip
              label={claim.status}
              color={
                claim.status === "Approved"
                  ? "success"
                  : claim.status === "pending"
                  ? "warning"
                  : "error"
              }
            />
          </Typography>

          {/* Status Update Buttons */}
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleUpdateStatus("Approved")}
              disabled={claim.status === "Approved" || updating}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleUpdateStatus("Denied")}
              disabled={claim.status === "Denied" || updating}
            >
              Deny
            </Button>
          </Box>

          {/* Back Button */}
          <Button variant="outlined" onClick={() => navigate("/claims")}>
            Back to Claims List
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClaimDetails;
