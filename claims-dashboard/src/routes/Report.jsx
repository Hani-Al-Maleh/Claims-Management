import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
  Tooltip,
  Paper,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const REPORT_STATUS_KEY = "report_status";
const REPORT_READY_TIME_KEY = "report_ready_time";
const REPORT_DOWNLOADED_KEY = "report_downloaded";
const REPORT_DATA_KEY = "report_data"; // Store CSV data

const Report = () => {
  const [status, setStatus] = useState("Click to generate report");
  const [loading, setLoading] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const savedStatus = localStorage.getItem(REPORT_STATUS_KEY);
    const readyTime = localStorage.getItem(REPORT_READY_TIME_KEY);
    const wasDownloaded = localStorage.getItem(REPORT_DOWNLOADED_KEY) === "true";
    const savedCsv = localStorage.getItem(REPORT_DATA_KEY);

    if (savedStatus === "Generating") {
      const timeElapsed = Date.now() - parseInt(readyTime || 0, 10);
      if (timeElapsed >= 10000) {
        setStatus("Report is ready! Click download.");
        setReportReady(true);
        setCsvData(savedCsv);
        localStorage.setItem(REPORT_STATUS_KEY, "Ready");
      } else {
        setStatus("Generating report... come back later.");
        let remainingTime = 10000 - timeElapsed;

        let interval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 10 : 100));
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setStatus("Report is ready! Click download.");
          setReportReady(true);
          setCsvData(savedCsv);
          localStorage.setItem(REPORT_STATUS_KEY, "Ready");
        }, remainingTime);
      }
    } else if (savedStatus === "Ready" && savedCsv) {
      setStatus("Report is ready! Click download.");
      setReportReady(true);
      setCsvData(savedCsv);
    }

    setDownloaded(wasDownloaded);
  }, []);

  const generateCSVReport = async () => {
    setLoading(true);
    setStatus("Generating report... come back later.");
    setReportReady(false);
    setDownloaded(false);
    setProgress(0);

    localStorage.setItem(REPORT_STATUS_KEY, "Generating");
    localStorage.setItem(REPORT_READY_TIME_KEY, Date.now().toString());
    localStorage.setItem(REPORT_DOWNLOADED_KEY, "false");

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);

    setTimeout(async () => {
      clearInterval(interval);
      try {
        const response = await axios.get("http://localhost:3001/claims");
        const claims = response.data;

        const groupedClaims = claims.reduce((acc, claim) => {
          acc[claim.status] = acc[claim.status] || [];
          acc[claim.status].push(claim);
          return acc;
        }, {});

        let csvDataArray = [["Status", "Patient Name", "Diagnosis Code", "Procedure Code", "Claim Amount"]];

        Object.keys(groupedClaims).forEach(status => {
          csvDataArray.push([status]);
          groupedClaims[status].forEach(claim => {
            csvDataArray.push([status, claim.patientName, claim.diagnosisCode, claim.procedureCode, `$${claim.claimAmount}`]);
          });

          const totalAmount = groupedClaims[status].reduce((sum, c) => sum + c.claimAmount, 0);
          csvDataArray.push([`Total ${status} Claims:`, "", "", "", `$${totalAmount}`]);
          csvDataArray.push([]);
        });

        const csvString = Papa.unparse(csvDataArray);
        setCsvData(csvString);
        localStorage.setItem(REPORT_DATA_KEY, csvString);

        setStatus("Report is ready! Click download.");
        setReportReady(true);
        localStorage.setItem(REPORT_STATUS_KEY, "Ready");
      } catch (error) {
        setStatus("Error generating report.");
        localStorage.removeItem(REPORT_STATUS_KEY);
      } finally {
        setLoading(false);
        setProgress(100);
      }
    }, 10000);
  };

  const downloadReport = () => {
    if (!reportReady || !csvData) return;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "claims_report.csv");

    setDownloaded(true);
    setReportReady(false);
    setCsvData(null);
    setStatus("Click to generate report");

    localStorage.setItem(REPORT_DOWNLOADED_KEY, "true");
    localStorage.removeItem(REPORT_STATUS_KEY);
    localStorage.removeItem(REPORT_DATA_KEY);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: '80%', width:'60%', mx: "auto", mt: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
        Report Page
      </Typography>
      <Typography color="textSecondary" fontSize={16}>
        {status}
      </Typography>

      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        <Tooltip title="Click to start generating the report">
          <span>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<CloudUploadIcon />}
              onClick={generateCSVReport}
              disabled={loading || reportReady}
              sx={{ fontSize: 16, fontWeight: 500 }}
            >
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          </span>
        </Tooltip>

        {loading && (
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <CircularProgress size={28} />
            <LinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
          </Box>
        )}

        {reportReady && !downloaded && (
          <Tooltip title="Click to download the generated report">
            <Button
              variant="contained"
              color="success"
              fullWidth
              startIcon={<FileDownloadIcon />}
              onClick={downloadReport}
              sx={{ fontSize: 16, fontWeight: 500 }}
            >
              Download Report
            </Button>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

export default Report;
