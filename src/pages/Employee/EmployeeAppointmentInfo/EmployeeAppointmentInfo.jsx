import React, { Component } from "react";
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import Loader from "../../../components/Loader/Loader";
import UpdateForm from './updateForm';
import Button from '../../../components/Button/Button';

export default class EmployeeBasicInfo extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			appointmentInformation: null,
	
			originalData: {},
		
			options: {
				jobTypeOptions: [],
				jobTitleOptions: [],
				jobGradeOptions: [],
				jobStepOptions: []
		  	},
	
		  showForm: false
		};
	
		this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
		this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
	}
	
	async fetchSelectComponentOptions() {
		const [
			jobTypes,
			jobTitles,
			jobGrades
		] = await httpService.all([
			httpService.get('/job-types?statusId=1'),
			httpService.get('/job-titles?statusId=1'),
			httpService.get('/job-grades')
		]);

		const options = {
			jobTypeOptions: nameMapper(jobTypes.data.data, 'type'),
			jobTitleOptions: nameMapper(jobTitles.data.data, 'description'),
			jobGradeOptions: nameMapper(jobGrades.data.data, 'conpss'),
			jobStepOptions: nameMapper(jobGrades.data.data, 'conpss'),
		}

		if (jobTypes) {
			this.setState({
			options
			});
		}
	}

	async fetchEmployeeData() {
		const res = await httpService.get(`/employees/${this.props.ippisNo}/appointment`);

		if (res) {
			const appointmentInformation = this.mapToViewModel(res.data.data);

			this.setState({
			appointmentInformation,
			originalData: res.data.data
			});
		}
	}

	async componentDidMount() {
		this.fetchEmployeeData();
		this.fetchSelectComponentOptions();
	}



	mapToViewModel(data) {
		return [
			{ label: "first appointment date", value: data.firstAppointmentDate },
			{ label: "resumption date", value: data.resumptionDate },
			{ label: "confirmation date", value: data.confirmationDate },
			{ label: "expected retirement date", value: data.expectedRetirementDate },
			{ label: "present appointment date", value: data.presentAppointmentDate },
			{ label: "first job type", value: data.firstJobType.type },
			{ label: "first job title", value: data.firstJobTitle.description },
			{ label: "first job grade(con)", value: data.firstJobGrade.con },
			{ label: "first job grade(conpss)", value: data.firstJobGrade.conpss },
			{ label: "present job type", value: data.presentJobType.type },
			{ label: "present job title", value: data.presentJobTitle.description },
			{ label: "present job grade(con)", value: data.presentJobGrade.con },
			{ label: "present job grade(conpss)", value: data.presentJobGrade.conpss }
		];
	}

	async handleUpdateSuccess() {
		await this.fetchEmployeeData();
		this.setState({ showForm: false })
	}

	handleUpdateButtonClick() {
		this.setState({ showForm: !this.state.showForm });
	}

	render() {
		const { basicInformation, appointmentInformation, showForm } = this.state;
		return appointmentInformation ? (
			<div>
				<div className="Action">
					{showForm ? (
						<Button
						label="cancel"
						onClick={this.handleUpdateButtonClick}
						plain
						/>
						) : (
						<Button
						label="update appointment details"
						onClick={this.handleUpdateButtonClick}
						highlight
						/>
					)}
				</div>
					{showForm ? (
						<div>
							<UpdateForm options={this.state.options} ippisNo={this.props.ippisNo} defaultValues={this.state.originalData} onSuccess={this.handleUpdateSuccess} />
						</div>
						) : (
						<React.Fragment>
							<EmployeeInfoBlock data={appointmentInformation} />
						</React.Fragment>
					)}
			</div>
			) : (
			<Loader />
		);

	}
}
