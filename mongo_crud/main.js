const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Create a new student
    await createStudent();

    // Get students older than 21
    await getStudentsAgeGreaterThan21();

    // Update student age
    await updateStudentAge();

    // Delete a student
    await deleteStudent();

  } finally {
    await client.close();
  }
}

async function createStudent() {
  const db = client.db('school');
  const studentsCollection = db.collection('students');

  const newStudent = {
    name: "Alice",
    age: 22,
    grade: "A"
  };

  const result = await studentsCollection.insertOne(newStudent);
  console.log(`Student created with ID: ${result.insertedId}`);
}

async function getStudentsAgeGreaterThan21() {
  const db = client.db('school');
  const studentsCollection = db.collection('students');

  const students = await studentsCollection.find({ age: { $gt: 21 } }).toArray();
  console.log("Students older than 21:", students);
}

async function updateStudentAge() {
  const db = client.db('school');
  const studentsCollection = db.collection('students');

  const result = await studentsCollection.updateOne(
    { name: "Alice" },
    { $set: { age: 23 } }
  );

  if (result.modifiedCount > 0) {
    console.log("Student age updated");
  } else {
    console.log("No student found or age already correct");
  }
}

async function deleteStudent() {
  const db = client.db('school');
  const studentsCollection = db.collection('students');

  const result = await studentsCollection.deleteOne({ name: "Alice" });

  if (result.deletedCount > 0) {
    console.log("Student deleted");
  } else {
    console.log("No student found");
  }
}

main().catch(console.error);
