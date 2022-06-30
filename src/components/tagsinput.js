import * as React from "react"
import "../styles/tagsinput.scss"

// based off of this code: https://codepen.io/prvnbist/pen/jJzROe  (and video: https://www.youtube.com/watch?v=RqQpnU6rbDE)

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				// type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				// placeholder="Press enter to add tags"
			/>
		</div>
	);
};

export default TagsInput;