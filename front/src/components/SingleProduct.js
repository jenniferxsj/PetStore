/* 

PAGE BUILT BY: MATTHEW

*/
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleProduct() {

	const { id } = useParams();

	const navigate = useNavigate();

	const goBack = () => {
		navigate("/products");
	};

	const [product, setState] = useState([]);
	const [productReview, setProductReview] = useState({})
	const [addRatingType, setRatingType] = useState(["Choose Rating", "1", "2", "3", "4", "5"])
	const [addContent, setContent] = useState({content: ""});
	const [error, setError] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/product/data/${id}`);
				const json = await response.json();
				console.log("PRODUCT: ", json);
				setState(json.data);
			} catch (e) {
				console.log("Error", e);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
  		window.scrollTo(0, 0)
	}, [])

	async function addToCart(event) {
		event.preventDefault();

		const quantity = document.getElementById("Input-Quantity-Product");
		if(quantity.value < 1 || quantity.value > 100) {
			displayMessage({msg: "Enter a valid quantity!"});
			return;
		} else {
			console.log("quantity valid!");
		}

		const data = {
			id: product._id,
		};

		const options = {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const cartData = await fetch("/api/product/cart", options);
		const cartJson = await cartData.json();
		displayMessage({msg: "Successful add to the cart" || cartJson.msg})
	}

	function displayMessage(newMessage) {
		const message = document.getElementById("cart-message");
		if(message.style.display === "none") {
			message.style.display = "block";
		}
		message.innerHTML = newMessage.msg;
		setTimeout(() => {
			message.style.display = "none";
		}, 3000)
	}

	/* FOR PROFESSOR */

	/*

	How to replicate:
	-> Project is using Mongodb, Node, Express, React obviously.  our dependencies are:
	"bcrypt": "^5.0.1",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "dotenv": "^10.0.0",
    "eslint": "7.11.0",
    "express": "~4.16.1",
    "express-session": "^1.17.2",
    "mongodb": "^4.1.4",
    "morgan": "~1.9.1",
    "nodemon": "^2.0.15"

    React Dependencies are:
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "bootstrap": "^5.1.3",
    "react": "^17.0.2",
    "react-bootstrap": "^2.0.2",
    "react-dom": "^17.0.2",
    "react-router": "^6.0.2",
    "react-router-dom": "^6.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"

    Currently, I'm just working on the front end side of the form, and the issues im having is getting the textarea to not lose
    focus when adding a subsequent character.

    All relevant functions and front end rendering is below.  The section which I need help on is rendering into the main component for this 
    page.  This currently is not processing data to the server, it's just a front end issue right now.

    Thank you! If you need any other notes, please let me know.  This review section is not dependent on the main product being rendered in this page
    and could be seperated without problems.

	*/

	async function addComment(event) {
		event.preventDefault();
		let review = document.getElementById("Input-Select");
		if(review.value === "0") {
			setError("Please give this product a rating!")
			return;
		}
		if(!addContent.content) {
			setError("Please write your review content!");
			return;
		}
		console.log("REVIEW REQUIREMENTS MET!");
		console.log(review.value);
		console.log(addContent.content)
	}

	const Add = addRatingType.map(Add => Add)
	const handleRatingChange = (e) => {
		console.log((addRatingType[e.target.value]))
	}

	function Review() {
		return (
			<div className = "row">
				<div className = "col-12">
					<h3>Product Reviews</h3>
				</div>
				<div className = "col-12">
					<h3>Add Review</h3>
					<div className = "form-group register-margin headup">
						<div className = "mb-3">{error}</div>
					</div>
					<form onSubmit={addComment}>
						<div className = "form-group">
							<select 
								className = "form-select mb-3"
								id = "Input-Select"
								name = "select"
				            	onChange={e => handleRatingChange(e)}
							>
							{
								Add.map((address, key) => <option value = {key} key = {key}>{address}</option>)
							}
							</select>
						</div>
						<div className = "form-group">
							<label htmlFor="content">Content</label>
							<textarea 
								className = "form-control" 
								name = "content"
								id = "Input-Content"
								rows = "3"
								type="text"
	            				onChange={(e) => setContent({...addContent, content: e.target.value})}
	            				value = {addContent.content}
							/>
						</div>
						<button type = "submit" className = "btn btn-color btn-block mt-2">
							Add Review
						</button>
					</form>
				</div>
			</div>
		)
	}

	function LineBreak() {
		return (
			<hr className = "my-4"/>
		)
	}

	return (
		<div className="font-setting single-product">
			<h1 className="title">{product.name}</h1>
			<div className = "row">
				<div className = "col-12">
					<span id = "cart-message"></span>
				</div>
			</div>
			<div className="row">
				<div className="product-img col-6">
					<img src={product.src} alt={`${product.name}`} />
				</div>
				<div className="col-6">
					<h3>Price: ${product.price}</h3>
					<p>
						<strong>Description: </strong>
						{product.description}
					</p>
					<div>
						<form onSubmit={addToCart}>
							<div className = "form-group">
								<div className = "mb-3">
								<label htmlFor="Input-Quantity-Product" className = "form-label">
								Add Quantity
								</label>
								<input
									type = "number"
									className = "form-control"
									id = "Input-Quantity-Product"
									name = "quantity"
								/>
								</div>
							</div>
							<button className="btn btn-color btn-block">Add To Cart</button>
						</form>
						<button
							type="button"
							className="btn btn-color btn-block go-back"
							onClick={goBack}
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
			< LineBreak /> 
			{Review()}
		</div>
	);
}


export default SingleProduct;