/** @format */

import React, { useState, useContext } from "react";
// import { UserDataContext } from "../user/UserDataContext";

export default function AddresValues() {
	// const { handleAddress } = useContext(UserDataContext);

	const [formData, setFormData] = useState({
		city: "",
		country: "India",
		fullAddress: "",
		lendMarck: "",
		phone: 0,
		state: "gujrat",
		zipcode: 0,
	});

	const [fieldErrors, setFieldErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		// Validate field on change
		validateField(name, value);
	};

	const handleAddressSubmit = async (e) => {
		// Modified to handle async operation
		e.preventDefault();
		if (!isFormValid()) {
			setErrorMessage("Please fill in all required fields with valid data.");
			return;
		}
		try {
			// await handleAddress(formData); // Wait for address submission
			setSuccessMessage("Address submitted successfully!"); // Set success message
			setFormData({
				// Clear form data
				city: "",
				country: "India",
				fullAddress: "",
				lendMarck: "",
				phone: 0,
				state: "gujrat",
				zipcode: 0,
			});
		} catch (error) {
			console.error("Error submitting address:", error);
			setErrorMessage("Failed to submit address. Please try again later."); // Display error message if submission fails
		}
	};

	const validateField = (name, value) => {
		switch (name) {
			case "phone":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					phone: validatePhoneNumber(value) ? "" : "Invalid phone number format",
				}));
				break;
			case "zipcode":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					zipcode: validateZipCode(value) ? "" : "Invalid zipcode format",
				}));
				break;
			case "fullAddress":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					fullAddress: validateFullAddress(value)
						? ""
						: "Full address must be 50 letters or more",
				}));
				break;
			default:
				break;
		}
	};

	const isFormValid = () => {
		return Object.values(fieldErrors).every((error) => error === "");
	};

	const validateFullAddress = (address) => {
		return address.length >= 50;
	};

	const validatePhoneNumber = (phone) => {
		const regex = /^\d{10}$/;
		return regex.test(phone);
	};

	const validateZipCode = (zipcode) => {
		const regex = /^\d{6}$/;
		return regex.test(zipcode);
	};

	return (
		<div className='address'>
			<div className='container'>
				{/* Success message */}
				{successMessage && <div className='success-message'>{successMessage}</div>}

				{/* Error message */}
				{errorMessage && <div className='error-message'>{errorMessage}</div>}
				{/* Rest of the component */}
				{/* ... */}
				{Object.values(fieldErrors).some((error) => error !== "") && (
					<div className='error-message'>
						{Object.values(fieldErrors).map((error, index) => (
							<p key={index}>{error}</p>
						))}
					</div>
				)}
				<h1>Shipping</h1>
				{errorMessage && <div className='error-message'>{errorMessage}</div>}
				<p>Please enter your shipping details. befor buy</p>
				<form onSubmit={handleAddressSubmit}>
					<div className='form'>
						<div className='fields fields--2'>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='lendMarck'
								>
									lendMarck
								</span>
								<input
									className='field__input'
									type='text'
									id='lendMarck'
									name='lendMarck'
									required
									value={formData.lendMarck || ""}
									onChange={handleChange}
								/>
							</label>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='phone'
								>
									Phone number
								</span>
								<input
									className='field__input'
									type='number'
									id='phone'
									name='phone'
									value={formData.phone || ""}
									onChange={handleChange}
								/>
							</label>
						</div>
						<label className='field'>
							<span
								className='field__label'
								htmlFor='fullAddress'
							>
								Full Address
							</span>
							<input
								className='field__input'
								type='text'
								id='fullAddress'
								name='fullAddress'
								value={formData.fullAddress || ""}
								onChange={handleChange}
							/>
						</label>

						<label className='field'>
							<span
								className='field__label'
								htmlFor='country'
							>
								Country
							</span>
							<select
								className='field__input'
								id='country'
								name='country'
								value={formData.country || ""}
								onChange={handleChange}
								defaultValue='india'
							>
								<option value>India</option>
							</select>
						</label>
						<div className='fields fields--3'>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='zipcode'
								>
									Zip code
								</span>
								<input
									className='field__input'
									type='number'
									id='zipcode'
									name='zipcode'
									value={formData.zipcode || ""}
									onChange={handleChange}
								/>
							</label>
							<label class='field'>
								<span
									className='field__label'
									htmlFor='city'
								>
									City
								</span>
								<input
									className='field__input'
									type='text'
									id='city'
									name='city'
									value={formData.city || ""}
									onChange={handleChange}
								/>
							</label>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='state'
								>
									State
								</span>
								<select
									className='field__input'
									id='state'
									name='state'
									value={formData.state || ""}
									onChange={handleChange}
									defaultValue='gujrat'
								>
									<option
										value='gujrat'
										selected
									>
										gujrat
									</option>
								</select>
							</label>
						</div>
					</div>
					<hr />
					<button
						className='button'
						type='submit'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
