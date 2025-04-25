// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { uploadResume, getATSResults, retryGetATSResults} from "./api";
// import { Link } from "react-router-dom";

// // Icon components
// const UploadIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//     <polyline points="17 8 12 3 7 8" />
//     <line x1="12" y1="3" x2="12" y2="15" />
//   </svg>
// )

// const FileTextIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//     <polyline points="10 9 9 9 8 9" />
//   </svg>
// )

// const CheckCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//     <polyline points="22 4 12 14.01 9 11.01" />
//   </svg>
// )

// const AlertCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="12" y1="8" x2="12" y2="12" />
//     <line x1="12" y1="16" x2="12.01" y2="16" />
//   </svg>
// )

// const ArrowRightIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="5" y1="12" x2="19" y2="12" />
//     <polyline points="12 5 19 12 12 19" />
//   </svg>
// )

// const ChevronRightIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// )

// const LightbulbIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="9" y1="18" x2="15" y2="18" />
//     <line x1="10" y1="22" x2="14" y2="22" />
//     <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
//   </svg>
// )

// // Progress component
// const Progress = ({ value }) => {
//   return (
//     <div style={{ width: "100%", backgroundColor: "#e2e8f0", borderRadius: "9999px", height: "8px" }}>
//       <div
//         style={{
//           width: `${value}%`,
//           backgroundColor: "#2563eb",
//           height: "8px",
//           borderRadius: "9999px",
//         }}
//       ></div>
//     </div>
//   )
// }

// // Badge component
// const Badge = ({ children, style }) => {
//   const baseStyle = {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "0 8px",
//     borderRadius: "9999px",
//     fontSize: "0.75rem",
//     fontWeight: "500",
//     ...style,
//   }

//   return <span style={baseStyle}>{children}</span>
// }

// // ATSResult component
// const ATSResult = ({ score, suggestions = [] }) => {
//   // Helper function to determine score color and background
//   const getScoreStyles = (score) => {
//     if (score >= 80) {
//       return {
//         textColor: "#16a34a", // green-600
//         bgColor: "#dcfce7", // green-100
//       }
//     }
//     if (score >= 60) {
//       return {
//         textColor: "#ca8a04", // yellow-600
//         bgColor: "#fef9c3", // yellow-100
//       }
//     }
//     return {
//       textColor: "#dc2626", // red-600
//       bgColor: "#fee2e2", // red-100
//     }
//   }

//   // Helper function to determine score message
//   const getScoreMessage = (score) => {
//     if (score >= 80) return "Excellent match! Your resume is well-aligned with this job."
//     if (score >= 60) return "Good match. With a few improvements, your resume could be stronger."
//     return "Your resume needs significant improvements to match this job description."
//   }

//   const scoreStyles = getScoreStyles(score)

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <div
//         style={{
//           backgroundColor: "white",
//           borderRadius: "8px",
//           boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//           borderTop: "4px solid #2563eb",
//         }}
//       >
//         <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
//           <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>ATS Match Results</h3>
//         </div>

//         <div style={{ padding: "24px" }}>
//           {/* Score Section */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "24px",
//               marginBottom: "24px",
//             }}
//           >
//             <motion.div
//               style={{
//                 backgroundColor: scoreStyles.bgColor,
//                 borderRadius: "9999px",
//                 padding: "24px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 200, damping: 15 }}
//             >
//               <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: scoreStyles.textColor }}>{score}%</span>
//             </motion.div>

//             <div style={{ flex: 1 }}>
//               <h3
//                 style={{
//                   fontSize: "1.125rem",
//                   fontWeight: "600",
//                   marginBottom: "8px",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 {score >= 80 ? (
//                   <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#16a34a" }}>
//                     <CheckCircleIcon />
//                   </span>
//                 ) : (
//                   <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#ca8a04" }}>
//                     <AlertCircleIcon />
//                   </span>
//                 )}
//                 Match Score
//               </h3>
//               <p style={{ color: "#4b5563" }}>{getScoreMessage(score)}</p>

//               <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                 <Badge style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}>Analysis Complete</Badge>
//                 {score >= 80 && <Badge style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>ATS Friendly</Badge>}
//                 {score >= 60 && score < 80 && (
//                   <Badge style={{ backgroundColor: "#fef9c3", color: "#ca8a04" }}>Needs Minor Improvements</Badge>
//                 )}
//                 {score < 60 && (
//                   <Badge style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>Needs Major Improvements</Badge>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Suggestions Section */}
//           {suggestions && suggestions.length > 0 && (
//             <div style={{ marginTop: "24px" }}>
//               <h3
//                 style={{
//                   fontSize: "1.125rem",
//                   fontWeight: "600",
//                   marginBottom: "12px",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#f59e0b" }}>
//                   <LightbulbIcon />
//                 </span>
//                 Improvement Suggestions
//               </h3>

//               <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                 {suggestions.map((suggestion, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     style={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       padding: "6px 12px",
//                       borderRadius: "9999px", 
//                       backgroundColor: "#eff6ff",
//                       border: "1px solid #dbeafe",
//                       fontSize: "0.875rem",
//                       color: "#1f2937",
//                       whiteSpace: "nowrap", 
//                       transition: "background-color 200ms, transform 200ms",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {suggestion}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* If no suggestions */}
//           {(!suggestions || suggestions.length === 0) && (
//             <div
//               style={{
//                 padding: "16px",
//                 backgroundColor: "#f9fafb",
//                 borderRadius: "8px",
//                 border: "1px solid #e5e7eb",
//                 textAlign: "center",
//               }}
//             >
//               <p style={{ color: "#4b5563" }}>No specific suggestions available at this time.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// // Main App component
// const App = () => {
//   const [resume, setResume] = useState(null)
//   const [jobDescription, setJobDescription] = useState("")
//   const [score, setScore] = useState(null)
//   const [suggestions, setSuggestions] = useState([])
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [status, setStatus] = useState({ show: false, success: false, message: "" })
//   const [fileName, setFileName] = useState("")
//   const [resumeId, setResumeId] = useState(null)
//   const [jobId, setJobId] = useState(null)
//   const [userId] = useState("default_user")
//   const [dragActive, setDragActive] = useState(false)
//   const [atsResults, setATSResults] = useState(null);
//   const [processingStep, setProcessingStep] = useState(0) // 0: Not started, 1: Uploading, 2: Processing, 3: Complete
//   const [uploadApiUrl, setUploadApiUrl] = useState('');
//   const [resultsApiUrl, setResultsApiUrl] = useState('');

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const response = await fetch('/config');
//         const config = await response.json();
//         console.log("Config:", config);
//         setUploadApiUrl(config.uploadApiGateway);
//         setResultsApiUrl(config.resultsApiGateway);
//       } catch (error) {
//         console.error("Initialization error:", error);
//         setStatus({ show: true, success: false, message: "Initialization failed: " + error.message });
//       }
//     };
//     initialize();
//   }, []);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0]
//       setResume(file)
//       setFileName(file.name)
//       // Reset status when new file is selected
//       setStatus({ show: false, success: false, message: "" })
//       // Reset score when a new file is selected
//       setScore(null)
//       setSuggestions([])
//     }
//   }

//   const handleDrag = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const file = e.dataTransfer.files[0]
//       setResume(file)
//       setFileName(file.name)
//       setStatus({ show: false, success: false, message: "" })
//       setScore(null)
//       setSuggestions([])
//     }
//   }

//   const handleUploadAndAnalyze = async () => {
//     if (!resume || !jobDescription.trim()) {
//       setStatus({ show: true, success: false, message: "Please provide resume and job description" });
//       return;
//     }
  
//     try {
//       setIsProcessing(true);
//       setProcessingStep(1);
  
//       const resumeResult = await uploadResume({
//         file: resume,
//         job_description: jobDescription  // Pass job description with resume
//       },uploadApiUrl);
//       setResumeId(resumeResult.resume_id);
//       const executionArn = resumeResult.executionArn;
  
//       setStatus({
//         show: true,
//         success: true,
//         message: "Processing started. Please wait for results."
//       });
  
//       console.log("Execution ARN:", executionArn);

//       setProcessingStep(2); // Processing in progress
    
//       // Poll for results
//       let results = null;
//       let attempts = 0;
//       const maxAttempts = 10;  // Maximum number of polling attempts
      
//       while (!results && attempts < maxAttempts) {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds between polls
//           // results = await getATSResults(resumeResult.resume_id);
//           results = await retryGetATSResults(resumeResult.resume_id, resultsApiUrl);
//           console.log("Resume ID being used for fetching results:", resumeResult.resume_id);
          
//           if (results) {
//             setProcessingStep(3); // Analyzing match
//             // Short delay to show the "Analyzing match" step before completing
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             setScore(results.ats_score);
//             setSuggestions(results.missing_keywords || []);
//             setStatus({
//               show: true,
//               success: true,
//               message: "Analysis complete!"
//             });
//           }
//         } catch (error) {
//           // If error is 404 (results not ready), continue polling
//           if (error.message.includes("404")) {
//             attempts++;
//             console.log(`Attempt ${attempts}/${maxAttempts}: Results not ready yet`);
//           } else {
//             // For other errors, break the loop
//             throw error;
//           }
//         }
//       }
      
//       if (!results && attempts >= maxAttempts) {
//         setStatus({
//           show: true,
//           success: false,
//           message: "Processing is taking longer than expected. Please check back later."
//         });
//       }

//     } catch (error) {
//       console.error("Processing failed:", error);
//       setStatus({ show: true, success: false, message: `Processing failed: ${error.message}` });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const containerStyle = {
//     minHeight: "100vh",
//     background: "linear-gradient(to bottom right, #f5f3ff, #dbeafe)",
//     padding: "48px 16px",
//   }

//   const cardContainerStyle = {
//     maxWidth: "64rem",
//     margin: "0 auto",
//   }

//   const cardStyle = {
//     backgroundColor: "white",
//     overflow: "hidden",
//     borderRadius: "12px",
//     border: "0",
//     boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//   }

//   const headerStyle = {
//     background: "linear-gradient(to right, #2563eb, #7c3aed)",
//     color: "white",
//     padding: "24px",
//   }

//   const headerTitleStyle = {
//     fontSize: "1.875rem",
//     fontWeight: "bold",
//   }

//   const headerDescriptionStyle = {
//     color: "#bfdbfe",
//     marginTop: "4px",
//   }

//   const contentStyle = {
//     padding: "24px 32px",
//   }

//   const sectionTitleStyle = {
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: "12px",
//     display: "flex",
//     alignItems: "center",
//   }

//   const iconStyle = {
//     marginRight: "8px",
//     height: "20px",
//     width: "20px",
//     color: "#2563eb",
//   }

//   const uploadAreaStyle = {
//     position: "relative",
//     border: "2px dashed #bfdbfe",
//     borderRadius: "12px",
//     transition: "all 300ms",
//     backgroundColor: dragActive ? "#eff6ff" : "rgba(239, 246, 255, 0.5)",
//     cursor: "pointer",
//   }

//   const uploadInputStyle = {
//     position: "absolute",
//     inset: "0",
//     width: "100%",
//     height: "100%",
//     opacity: "0",
//     cursor: "pointer",
//     zIndex: "10",
//   }

//   const uploadContentStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "32px 16px",
//     textAlign: "center",
//   }

//   const uploadIconContainerStyle = {
//     marginBottom: "16px",
//     backgroundColor: "#dbeafe",
//     padding: "16px",
//     borderRadius: "9999px",
//     color: "#2563eb",
//   }

//   const uploadTextStyle = {
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     color: "#2563eb",
//     marginBottom: "4px",
//   }

//   const uploadSubtextStyle = {
//     fontSize: "0.75rem",
//     color: "#6b7280",
//   }

//   const fileSelectedStyle = {
//     marginTop: "12px",
//     display: "flex",
//     alignItems: "center",
//     color: "#16a34a",
//   }

//   const textareaStyle = {
//     width: "100%",
//     minHeight: "150px",
//     padding: "8px 12px",
//     color: "#374151",
//     border: "1px solid #d1d5db",
//     borderRadius: "8px",
//     resize: "none",
//   }

//   const buttonStyle = {
//     width: "100%",
//     padding: "16px 24px",
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     color: "white",
//     borderRadius: "6px",
//     transition: "all 200ms",
//     background:
//       !resume || !jobDescription.trim() || isProcessing ? "#93c5fd" : "linear-gradient(to right, #2563eb, #7c3aed)",
//     cursor: !resume || !jobDescription.trim() || isProcessing ? "not-allowed" : "pointer",
//     border: "none",
//     boxShadow:
//       !resume || !jobDescription.trim() || isProcessing
//         ? "none"
//         : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//   }

//   const alertStyle = {
//     borderRadius: "6px",
//     padding: "16px",
//     backgroundColor: status.success ? "#ecfdf5" : "#fef2f2",
//     border: `1px solid ${status.success ? "#d1fae5" : "#fee2e2"}`,
//     marginBottom: "24px",
//   }

//   const alertTitleStyle = {
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     color: status.success ? "#065f46" : "#b91c1c",
//     display: "flex",
//     alignItems: "center",
//   }

//   const alertIconStyle = {
//     height: "16px",
//     width: "16px",
//     marginRight: "8px",
//     color: status.success ? "#10b981" : "#ef4444",
//   }

//   const alertMessageStyle = {
//     marginTop: "4px",
//     fontSize: "0.875rem",
//     color: status.success ? "#047857" : "#dc2626",
//   }

//   const progressContainerStyle = {
//     marginBottom: "24px",
//   }

//   const progressLabelStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "0.875rem",
//     marginBottom: "8px",
//   }

//   const progressStepStyle = {
//     fontSize: "0.75rem",
//     color: "#6b7280",
//     marginTop: "8px",
//   }

//   const footerStyle = {
//     textAlign: "center",
//     marginTop: "24px",
//     fontSize: "0.875rem",
//     color: "#6b7280",
//   }

//   return (
//     <div style={containerStyle}>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         style={cardContainerStyle}
//       >
//         <div style={cardStyle}>
//           <div style={headerStyle}>
//             <h1 style={headerTitleStyle}>ATS Resume Scanner</h1>
//             <p style={headerDescriptionStyle}>Upload your resume to check how well it matches job descriptions</p>
//           </div>

//           <div style={contentStyle}>
//             {/* Resume Upload Section */}
//             <div style={{ marginBottom: "32px" }}>
//               <h2 style={sectionTitleStyle}>
//                 <span style={iconStyle}>
//                   <FileTextIcon />
//                 </span>
//                 Upload Your Resume
//               </h2>

//               <div
//                 style={{
//                   ...uploadAreaStyle,
//                   borderColor: dragActive ? "#3b82f6" : "#bfdbfe",
//                   backgroundColor: dragActive ? "#eff6ff" : "rgba(239, 246, 255, 0.5)",
//                 }}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//               >
//                 <input
//                   type="file"
//                   style={uploadInputStyle}
//                   accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.tiff"
//                   onChange={handleFileChange}
//                 />

//                 <div style={uploadContentStyle}>
//                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={uploadIconContainerStyle}>
//                     <span style={{ height: "32px", width: "32px" }}>
//                       <UploadIcon />
//                     </span>
//                   </motion.div>

//                   <p style={uploadTextStyle}>{fileName ? fileName : "Drag & drop or click to upload"}</p>
//                   <p style={uploadSubtextStyle}>Supported formats: Only PDF</p>

//                   {fileName && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       style={fileSelectedStyle}
//                     >
//                       <span style={{ height: "16px", width: "16px", marginRight: "4px" }}>
//                         <CheckCircleIcon />
//                       </span>
//                       <span style={{ fontSize: "0.875rem", paddingLeft: "1rem", paddingTop : "0.5rem" }}>File selected</span>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Job Description Section */}
//             <div style={{ marginBottom: "32px" }}>
//               <h2 style={sectionTitleStyle}>
//                 <span style={iconStyle}>
//                   <FileTextIcon />
//                 </span>
//                 Job Description
//               </h2>

//               <textarea
//                 style={textareaStyle}
//                 placeholder="Paste job description here..."
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//               />
//             </div>

//             {/* Status Message */}
//             <AnimatePresence>
//               {status.show && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   style={alertStyle}
//                 >
//                   <div style={alertTitleStyle}>
//                     <span style={alertIconStyle}>{status.success ? <CheckCircleIcon /> : <AlertCircleIcon />}</span>
//                     {status.success ? "Success" : "Error"}
//                   </div>
//                   <div style={alertMessageStyle}>{status.message}</div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Processing Progress */}
//             {isProcessing && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={progressContainerStyle}>
//                 <div style={progressLabelStyle}>
//                   <span>Processing...</span>
//                   <span>{Math.round((processingStep / 3) * 100)}%</span>
//                 </div>
//                 <Progress value={(processingStep / 3) * 100} />
//                 <div style={progressStepStyle}>
//                   {processingStep === 1 && "Uploading resume..."}
//                   {processingStep === 2 && "Processing job description..."}
//                   {processingStep === 3 && "Analyzing match..."}
//                 </div>
//               </motion.div>
//             )}

//             {/* Upload & Analyze Button */}
//             <div style={{ marginTop: "16px" }}>
//               <motion.div
//                 whileHover={{ scale: !resume || !jobDescription.trim() || isProcessing ? 1 : 1.02 }}
//                 whileTap={{ scale: !resume || !jobDescription.trim() || isProcessing ? 1 : 0.98 }}
//               >
//                 <button
//                   onClick={handleUploadAndAnalyze}
//                   disabled={isProcessing || !resume || !jobDescription.trim()}
//                   style={buttonStyle}
//                 >
//                   {isProcessing ? (
//                     <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                       <svg
//                         className="animate-spin"
//                         style={{ marginRight: "12px", height: "20px", width: "20px" }}
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           style={{ opacity: 0.25 }}
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           style={{ opacity: 0.75 }}
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                       Analyze Resume Match
//                       <span style={{ marginLeft: "8px", height: "20px", width: "20px" }}>
//                         <ArrowRightIcon />
//                       </span>
//                     </span>
//                   )}
//                 </button>
//               </motion.div>
//             </div>

//             {/* Results Section */}
//             <AnimatePresence>
//               {score !== null && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                   style={{ marginTop: "32px" }}
//                 >
//                   <ATSResult score={score} suggestions={suggestions} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         <div style={footerStyle}>Project Made By - Yash Harjani (B00988469)</div>
//       </motion.div>
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { uploadResume, getATSResults, retryGetATSResults} from "./api";
import { Link } from "react-router-dom";

// Icon components
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
)

// Progress component
const Progress = ({ value }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#e2e8f0", borderRadius: "9999px", height: "8px" }}>
      <div
        style={{
          width: `${value}%`,
          backgroundColor: "#2563eb",
          height: "8px",
          borderRadius: "9999px",
        }}
      ></div>
    </div>
  )
}

// Badge component
const Badge = ({ children, style }) => {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "0 8px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    ...style,
  }

  return <span style={baseStyle}>{children}</span>
}

// ATSResult component
const ATSResult = ({ score, suggestions = [] }) => {
  // Helper function to determine score color and background
  const getScoreStyles = (score) => {
    if (score >= 80) {
      return {
        textColor: "#16a34a", // green-600
        bgColor: "#dcfce7", // green-100
      }
    }
    if (score >= 60) {
      return {
        textColor: "#ca8a04", // yellow-600
        bgColor: "#fef9c3", // yellow-100
      }
    }
    return {
      textColor: "#dc2626", // red-600
      bgColor: "#fee2e2", // red-100
    }
  }

  // Helper function to determine score message
  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent match! Your resume is well-aligned with this job."
    if (score >= 60) return "Good match. With a few improvements, your resume could be stronger."
    return "Your resume needs significant improvements to match this job description."
  }

  const scoreStyles = getScoreStyles(score)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderTop: "4px solid #2563eb",
        }}
      >
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>ATS Match Results</h3>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Score Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <motion.div
              style={{
                backgroundColor: scoreStyles.bgColor,
                borderRadius: "9999px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: scoreStyles.textColor }}>{score}%</span>
            </motion.div>

            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {score >= 80 ? (
                  <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#16a34a" }}>
                    <CheckCircleIcon />
                  </span>
                ) : (
                  <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#ca8a04" }}>
                    <AlertCircleIcon />
                  </span>
                )}
                Match Score
              </h3>
              <p style={{ color: "#4b5563" }}>{getScoreMessage(score)}</p>

              <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <Badge style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}>Analysis Complete</Badge>
                {score >= 80 && <Badge style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>ATS Friendly</Badge>}
                {score >= 60 && score < 80 && (
                  <Badge style={{ backgroundColor: "#fef9c3", color: "#ca8a04" }}>Needs Minor Improvements</Badge>
                )}
                {score < 60 && (
                  <Badge style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>Needs Major Improvements</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          {suggestions && suggestions.length > 0 && (
            <div style={{ marginTop: "24px" }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "8px", height: "20px", width: "20px", color: "#f59e0b" }}>
                  <LightbulbIcon />
                </span>
                Improvement Suggestions
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 12px",
                      borderRadius: "9999px", 
                      backgroundColor: "#eff6ff",
                      border: "1px solid #dbeafe",
                      fontSize: "0.875rem",
                      color: "#1f2937",
                      whiteSpace: "nowrap", 
                      transition: "background-color 200ms, transform 200ms",
                      cursor: "pointer",
                    }}
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* If no suggestions */}
          {(!suggestions || suggestions.length === 0) && (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#4b5563" }}>No specific suggestions available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Main App component
const App = () => {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [score, setScore] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState({ show: false, success: false, message: "" })
  const [fileName, setFileName] = useState("")
  const [resultId, setResultId] = useState(null)
  const [userId] = useState("default_user")
  const [dragActive, setDragActive] = useState(false)
  const [processingStep, setProcessingStep] = useState(0) // 0: Not started, 1: Uploading, 2: Processing, 3: Complete
  const [uploadApiUrl, setUploadApiUrl] = useState('')
  const [resultsApiUrl, setResultsApiUrl] = useState('')

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await fetch('/config')
        const config = await response.json()
        console.log("Config:", config)
        setUploadApiUrl(config.uploadApiGateway)
        setResultsApiUrl(config.resultsApiGateway)
      } catch (error) {
        console.error("Initialization error:", error)
        setStatus({ show: true, success: false, message: "Initialization failed: " + error.message })
      }
    }
    initialize()
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      setResume(file)
      setFileName(file.name)
      // Reset status when new file is selected
      setStatus({ show: false, success: false, message: "" })
      // Reset score when a new file is selected
      setScore(null)
      setSuggestions([])
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setResume(file)
      setFileName(file.name)
      setStatus({ show: false, success: false, message: "" })
      setScore(null)
      setSuggestions([])
    }
  }

  const handleUploadAndAnalyze = async () => {
    if (!resume || !jobDescription.trim()) {
      setStatus({ show: true, success: false, message: "Please provide resume and job description" })
      return
    }

    try {
      setIsProcessing(true)
      setProcessingStep(1)

      const resumeResult = await uploadResume({
        file: resume,
        job_description: jobDescription
      }, uploadApiUrl)
      setResultId(resumeResult.result_id)
      const executionArn = resumeResult.executionArn

      setStatus({
        show: true,
        success: true,
        message: "Processing started. Please wait for results."
      })

      console.log("Execution ARN:", executionArn)

      setProcessingStep(2) // Processing in progress
    
      // Poll for results
      let results = null
      let attempts = 0
      const maxAttempts = 20 // Increased to 60 seconds total

      while (!results && attempts < maxAttempts) {
        try {
          await new Promise(resolve => setTimeout(resolve, 3000))
          results = await retryGetATSResults(resumeResult.result_id, resultsApiUrl)
          console.log("Result ID being used for fetching results:", resumeResult.result_id)

          if (results) {
            setProcessingStep(3) // Analyzing match
            await new Promise(resolve => setTimeout(resolve, 1500))
            setScore(results.ats_score)
            setSuggestions(results.missing_keywords || [])
            setStatus({
              show: true,
              success: true,
              message: "Analysis complete!"
            })
          }
        } catch (error) {
          if (error.message.includes("404")) {
            attempts++
            console.log(`Attempt ${attempts}/${maxAttempts}: Results not ready yet`)
          } else {
            throw error
          }
        }
      }

      if (!results && attempts >= maxAttempts) {
        setStatus({
          show: true,
          success: false,
          message: "Processing is taking longer than expected. Please check back later."
        })
      }
    } catch (error) {
      console.error("Processing failed:", error)
      setStatus({ show: true, success: false, message: `Processing failed: ${error.message}` })
    } finally {
      setIsProcessing(false)
    }
  }

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f5f3ff, #dbeafe)",
    padding: "48px 16px",
  }

  const cardContainerStyle = {
    maxWidth: "64rem",
    margin: "0 auto",
  }

  const cardStyle = {
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: "12px",
    border: "0",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  }

  const headerStyle = {
    background: "linear-gradient(to right, #2563eb, #7c3aed)",
    color: "white",
    padding: "24px",
  }

  const headerTitleStyle = {
    fontSize: "1.875rem",
    fontWeight: "bold",
  }

  const headerDescriptionStyle = {
    color: "#bfdbfe",
    marginTop: "4px",
  }

  const contentStyle = {
    padding: "24px 32px",
  }

  const sectionTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
  }

  const iconStyle = {
    marginRight: "8px",
    height: "20px",
    width: "20px",
    color: "#2563eb",
  }

  const uploadAreaStyle = {
    position: "relative",
    border: "2px dashed #bfdbfe",
    borderRadius: "12px",
    transition: "all 300ms",
    backgroundColor: dragActive ? "#eff6ff" : "rgba(239, 246, 255, 0.5)",
    cursor: "pointer",
  }

  const uploadInputStyle = {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
    zIndex: "10",
  }

  const uploadContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    textAlign: "center",
  }

  const uploadIconContainerStyle = {
    marginBottom: "16px",
    backgroundColor: "#dbeafe",
    padding: "16px",
    borderRadius: "9999px",
    color: "#2563eb",
  }

  const uploadTextStyle = {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: "4px",
  }

  const uploadSubtextStyle = {
    fontSize: "0.75rem",
    color: "#6b7280",
  }

  const fileSelectedStyle = {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    color: "#16a34a",
  }

  const textareaStyle = {
    width: "100%",
    minHeight: "150px",
    padding: "8px 12px",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    resize: "none",
  }

  const buttonStyle = {
    width: "100%",
    padding: "16px 24px",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "white",
    borderRadius: "6px",
    transition: "all 200ms",
    background:
      !resume || !jobDescription.trim() || isProcessing ? "#93c5fd" : "linear-gradient(to right, #2563eb, #7c3aed)",
    cursor: !resume || !jobDescription.trim() || isProcessing ? "not-allowed" : "pointer",
    border: "none",
    boxShadow:
      !resume || !jobDescription.trim() || isProcessing
        ? "none"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }

  const navButtonStyle = {
    width: "100%",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "500",
    color: "white",
    borderRadius: "6px",
    background: "linear-gradient(to right, #4b5563, #6b7280)",
    cursor: "pointer",
    border: "none",
    marginTop: "16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
  }

  const alertStyle = {
    borderRadius: "6px",
    padding: "16px",
    backgroundColor: status.success ? "#ecfdf5" : "#fef2f2",
    border: `1px solid ${status.success ? "#d1fae5" : "#fee2e2"}`,
    marginBottom: "24px",
  }

  const alertTitleStyle = {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: status.success ? "#065f46" : "#b91c1c",
    display: "flex",
    alignItems: "center",
  }

  const alertIconStyle = {
    height: "16px",
    width: "16px",
    marginRight: "8px",
    color: status.success ? "#10b981" : "#ef4444",
  }

  const alertMessageStyle = {
    marginTop: "4px",
    fontSize: "0.875rem",
    color: status.success ? "#047857" : "#dc2626",
  }

  const progressContainerStyle = {
    marginBottom: "24px",
  }

  const progressLabelStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.875rem",
    marginBottom: "8px",
  }

  const progressStepStyle = {
    fontSize: "0.75rem",
    color: "#6b7280",
    marginTop: "8px",
  }

  const footerStyle = {
    textAlign: "center",
    marginTop: "24px",
    fontSize: "0.875rem",
    color: "#6b7280",
  }

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={cardContainerStyle}
      >
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h1 style={headerTitleStyle}>ATS Resume Scanner</h1>
            <p style={headerDescriptionStyle}>Upload your resume to check how well it matches job descriptions</p>
          </div>

          <div style={contentStyle}>
            {/* Resume Upload Section */}
            <div style={{ marginBottom: "32px" }}>
              <h2 style={sectionTitleStyle}>
                <span style={iconStyle}>
                  <FileTextIcon />
                </span>
                Upload Your Resume
              </h2>

              <div
                style={{
                  ...uploadAreaStyle,
                  borderColor: dragActive ? "#3b82f6" : "#bfdbfe",
                  backgroundColor: dragActive ? "#eff6ff" : "rgba(239, 246, 255, 0.5)",
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  style={uploadInputStyle}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.tiff"
                  onChange={handleFileChange}
                />

                <div style={uploadContentStyle}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={uploadIconContainerStyle}>
                    <span style={{ height: "32px", width: "32px" }}>
                      <UploadIcon />
                    </span>
                  </motion.div>

                  <p style={uploadTextStyle}>{fileName ? fileName : "Drag & drop or click to upload"}</p>
                  <p style={uploadSubtextStyle}>Supported formats: Only PDF</p>

                  {fileName && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={fileSelectedStyle}
                    >
                      <span style={{ height: "16px", width: "16px", marginRight: "4px" }}>
                        <CheckCircleIcon />
                      </span>
                      <span style={{ fontSize: "0.875rem", paddingLeft: "1rem", paddingTop : "0.5rem" }}>File selected</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description Section */}
            <div style={{ marginBottom: "32px" }}>
              <h2 style={sectionTitleStyle}>
                <span style={iconStyle}>
                  <FileTextIcon />
                </span>
                Job Description
              </h2>

              <textarea
                style={textareaStyle}
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* Status Message */}
            <AnimatePresence>
              {status.show && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={alertStyle}
                >
                  <div style={alertTitleStyle}>
                    <span style={alertIconStyle}>{status.success ? <CheckCircleIcon /> : <AlertCircleIcon />}</span>
                    {status.success ? "Success" : "Error"}
                  </div>
                  <div style={alertMessageStyle}>{status.message}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing Progress */}
            {isProcessing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={progressContainerStyle}>
                <div style={progressLabelStyle}>
                  <span>Processing...</span>
                  <span>{Math.round((processingStep / 3) * 100)}%</span>
                </div>
                <Progress value={(processingStep / 3) * 100} />
                <div style={progressStepStyle}>
                  {processingStep === 1 && "Uploading resume..."}
                  {processingStep === 2 && "Processing job description..."}
                  {processingStep === 3 && "Analyzing match..."}
                </div>
              </motion.div>
            )}

            {/* Upload & Analyze Button */}
            <div style={{ marginTop: "16px" }}>
              <motion.div
                whileHover={{ scale: !resume || !jobDescription.trim() || isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: !resume || !jobDescription.trim() || isProcessing ? 1 : 0.98 }}
              >
                <button
                  onClick={handleUploadAndAnalyze}
                  disabled={isProcessing || !resume || !jobDescription.trim()}
                  style={buttonStyle}
                >
                  {isProcessing ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg
                        className="animate-spin"
                        style={{ marginRight: "12px", height: "20px", width: "20px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          style={{ opacity: 0.25 }}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          style={{ opacity: 0.75 }}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      Analyze Resume Match
                      <span style={{ marginLeft: "8px", height: "20px", width: "20px" }}>
                        <ArrowRightIcon />
                      </span>
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* History Button */}
            <div style={{ marginTop: "16px" }}>
              <Link to="/history" style={navButtonStyle}>
                View Previous Results
              </Link>
            </div>

            {/* Results Section */}
            <AnimatePresence>
              {score !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: "32px" }}
                >
                  <ATSResult score={score} suggestions={suggestions} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div style={footerStyle}>Project Made By - Yash Harjani (B00988469)</div>
      </motion.div>
    </div>
  )
}

export default App