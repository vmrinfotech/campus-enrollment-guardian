
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  // Format date to be more readable
  const formattedDate = new Date(student.enrollmentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {student.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="text-sm text-gray-500">{student.email}</div>
        <div className="text-sm text-gray-500">{student.phone}</div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{student.batch}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
