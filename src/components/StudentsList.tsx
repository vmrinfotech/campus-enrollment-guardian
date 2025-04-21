
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student, StudentsByBatchAndYear } from "@/types/student";
import { StudentCard } from "@/components/StudentCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentsListProps {
  students: Student[];
}

export function StudentsList({ students }: StudentsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Group students by batch and academic year
  const groupedStudents: StudentsByBatchAndYear = students.reduce((acc, student) => {
    if (!acc[student.batch]) {
      acc[student.batch] = {};
    }
    
    if (!acc[student.batch][student.academicYear]) {
      acc[student.batch][student.academicYear] = [];
    }
    
    acc[student.batch][student.academicYear].push(student);
    return acc;
  }, {} as StudentsByBatchAndYear);
  
  // Get unique batches
  const batches = Object.keys(groupedStudents);
  
  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search students by name, ID or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      {searchQuery ? (
        <div className="space-y-4">
          <h3 className="font-medium">Search Results ({filteredStudents.length})</h3>
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No students found matching "{searchQuery}"
            </div>
          )}
        </div>
      ) : batches.length > 0 ? (
        <Tabs defaultValue={batches[0]} className="w-full">
          <TabsList className="w-full mb-4 flex overflow-auto">
            {batches.map((batch) => (
              <TabsTrigger key={batch} value={batch} className="flex-1">
                {batch}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {batches.map((batch) => (
            <TabsContent key={batch} value={batch} className="space-y-4">
              {Object.keys(groupedStudents[batch]).map((year) => (
                <div key={year} className="space-y-2">
                  <h3 className="font-medium">Academic Year: {year} ({groupedStudents[batch][year].length})</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                      {groupedStudents[batch][year].map((student) => (
                        <StudentCard key={student.id} student={student} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No students enrolled yet
        </div>
      )}
    </div>
  );
}
