
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Student } from "@/types/student";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  batch: z.string({ required_error: "Please select a batch." }),
  academicYear: z.string({ required_error: "Please select an academic year." }),
});

interface StudentFormProps {
  onAddStudent: (student: Student) => void;
  existingStudents: Student[];
  maxEnrollments: number;
  currentEnrollments: number;
}

export function StudentForm({ onAddStudent, existingStudents, maxEnrollments, currentEnrollments }: StudentFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      batch: "",
      academicYear: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    // Check if max enrollment limit is reached
    if (currentEnrollments >= maxEnrollments) {
      toast({
        title: "Maximum enrollment limit reached",
        description: "Cannot enroll more students at this time.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check for duplicate enrollment
    const isDuplicate = existingStudents.some(
      (student) => 
        student.email === values.email && 
        student.batch === values.batch && 
        student.academicYear === values.academicYear
    );

    if (isDuplicate) {
      toast({
        title: "Duplicate enrollment detected",
        description: "This student is already enrolled in this batch and academic year.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Generate student ID (format: STD-YYYY-XXXX where XXXX is a random number)
    const currentYear = new Date().getFullYear();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const studentId = `STD-${currentYear}-${randomPart}`;

    // Create new student object
    const newStudent: Student = {
      id: studentId,
      name: values.name,
      email: values.email,
      phone: values.phone,
      batch: values.batch,
      academicYear: values.academicYear,
      enrollmentDate: new Date().toISOString(),
    };

    // Add student
    onAddStudent(newStudent);
    
    // Reset form
    form.reset();
    setLoading(false);
    
    toast({
      title: "Student enrolled successfully",
      description: `${values.name} has been enrolled with ID: ${studentId}`,
    });
  }

  const batchOptions = ["Morning", "Afternoon", "Evening", "Weekend"];
  const currentYear = new Date().getFullYear();
  const academicYearOptions = [
    `${currentYear}-${currentYear + 1}`,
    `${currentYear + 1}-${currentYear + 2}`,
    `${currentYear + 2}-${currentYear + 3}`,
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a batch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {batchOptions.map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Year</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {academicYearOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          disabled={loading || currentEnrollments >= maxEnrollments}
        >
          {loading ? "Enrolling..." : "Enroll Student"}
        </Button>
      </form>
    </Form>
  );
}
