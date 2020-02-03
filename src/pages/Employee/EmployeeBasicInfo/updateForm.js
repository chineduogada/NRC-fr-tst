import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from '../../../components/Form/Form';

export default class UpdateForm extends Form {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                ippisNo: '',
                firstName: '',
                lastName: '',
                middleNames: '',
                initials: '',
                nrcNo: '',
                phoneNumber: '',
                email: '',
                pfaNumber: '',
                pfaId: '',
                genderId: '',
                bloodGroupId: '',
                gpzId: '',
                lgaId: '',
                maritalStatusId: '',
                senatorialDistrictId: '',
                professional: '',
                stateId: '',
            },

            errors: {},

            bloodGroupOptions: [],
            pfaOptions: [],
            gpzOptions: [],
            maritalStatusOptions: [],
            senatorialDistrictOptions: [],
            stateOptions: [],
            lgaOptions: [],
            countryOptions: []
        }

        this.schema = {

        }
    }
}