const employees = [
	{
		id: "abc1",
		name: "ogada chinedu stanley",
		department: "software developer",
		jobType: "NYSC",
		jobTitle: "job title 1"
	},
	{
		id: "abc2",
		name: "richCode stanley",
		department: "software developer",
		jobType: "NYSC",
		jobTitle: "job title 2"
	},
	{
		id: "abc3",
		name: "aaa bbb ccc",
		department: "software developer",
		jobType: "NYSC",
		jobTitle: "job title 3"
	},
	{
		id: "abc4",
		name: "ogada chinedu stanley",
		department: "software developer",
		jobType: "NYSC",
		jobTitle: "job title 4"
	}
];

export const getEmployees = () => employees.filter(e => e.id);
