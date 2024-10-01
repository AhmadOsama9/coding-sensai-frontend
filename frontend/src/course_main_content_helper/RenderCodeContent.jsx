import ReactMarkdown from 'react-markdown';

const RenderCodeContent = ({ code }) => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-primaryText">{code.code_title}</h1>
            <p className="text-secondaryText">{code.code_description}</p>
            <h3 className="text-xl font-semibold text-primary">{code.code_content_title}</h3>
            <div className="prose max-w-none text-primaryText">
                <ReactMarkdown>{code.code_content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default RenderCodeContent;
