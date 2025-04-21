
import { useState } from "react";
import { Student } from "@/types/student";
import { StudentForm } from "@/components/StudentForm";
import { EnrollmentCounter } from "@/components/EnrollmentCounter";
import { StudentsList } from "@/components/StudentsList";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_ENROLLMENTS = 50; // Maximum student enrollment limit

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  
  const handleAddStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <div className="container mx-auto py-6 px-4 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-800">Campus Enrollment Guardian</h1>
        <p className="text-gray-600 mt-2">Efficiently manage student enrollments with ease</p>
      </div>
      
      <Tabs defaultValue="enroll" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="enroll">Enroll Students</TabsTrigger>
          <TabsTrigger value="view">View Enrollments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enroll">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Enrollment Form</CardTitle>
                <CardDescription>
                  Add a new student to the enrollment system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StudentForm 
                  onAddStudent={handleAddStudent} 
                  existingStudents={students}
                  maxEnrollments={MAX_ENROLLMENTS}
                  currentEnrollments={students.length}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <EnrollmentCounter 
                    current={students.length} 
                    maximum={MAX_ENROLLMENTS} 
                  />
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-700">{students.length}</div>
                      <div className="text-sm text-blue-600">Total Students</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-700">
                        {MAX_ENROLLMENTS - students.length}
                      </div>
                      <div className="text-sm text-green-600">Available Slots</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  {students.length > 0 ? (
                    <div className="space-y-4">
                      {students.slice(-3).reverse().map((student) => (
                        <div key={student.id} className="border-b pb-3 last:border-0 last:pb-0">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.batch} - {student.academicYear}</p>
                          <p className="text-xs text-gray-400">ID: {student.id}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No enrollments yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>
                View all students grouped by batch and academic year
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <StudentsList students={students} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  );
};

export default Index;
