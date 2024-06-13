import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#1c1706",
    color: "white",
    padding: "4pt",
    width: "400pt",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "block",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    width: "40vw",
    marginHorizontal: "auto",
  },
  tableRow: {
    // margin: 'auto',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    border: 2,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 8,
    textAlign: "left",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  present: {
    backgroundColor: "#013b05",
  },
  absent: {
    backgroundColor: "#4a0303",
  },
  footer: {
    backgroundColor: "black",
    fontSize: "12pt",
    textAlign: "center",
    padding: "2pt",
    marginTop: "4pt",
  },
});

const MyDocument = (props) => {
  const { records } = props;
  return (
    <Document
      title="Quick Attendance Taker | Created by devangspsingh"
      author="DEVANGSPSINGH"
      subject="Quick Attendance Taker | Created by devangspsingh"
      creator="DEVANGSPSINGH"
      producer="DEVANGSPSINGH">
      <Page size={"A4"} wrap style={styles.page}>
        <View style={{ backgroundColor: "black", paddingBottom: "8pt" }}>
          <View style={styles.heading}>
            <Text>Quick Attendance Taker</Text>
          </View>
          <View style={{ justifyContent: "center", gap: "20pt", flexDirection: "row", fontSize: "8pt" }}>
            <View>
              <Text>BTech ComputerScience 3rdYear</Text>
            </View>
            <View>
              <Text>3rd Year</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { width: "24pt", textAlign: "start" }]}>
                <Text>RollNo</Text>
              </View>
              <View style={[styles.tableCell, { width: "150pt", textAlign: "start" }]}>
                <Text>Name</Text>
              </View>
              <View style={[styles.tableCell, { width: "30pt", textAlign: "start" }]}>
                <Text>Status</Text>
              </View>
            </View>
            {records.map((record, index) => (
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    border: 1,
                    justifyContent: "space-between",
                    fontSize: "8pt",
                  },
                  record.status ? styles.present : styles.absent,
                ]}
                key={index}>
                <View style={[styles.tableCell, { width: "24pt", textAlign: "start" }]}>
                  <Text>{record.rollNo.toString().slice(7)}.</Text>
                </View>
                <View style={[styles.tableCell, { width: "150pt", textAlign: "start" }]}>
                  <Text>{record.name}</Text>
                </View>
                <View style={[styles.tableCell, { width: "30pt", textAlign: "start" }]}>
                  <Text>{record.status ? "Present" : "Absent"}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Quick Attendance Taker @devangspsingh</Text>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
