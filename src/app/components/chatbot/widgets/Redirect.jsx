import Link from 'next/link';

const Redirects = (props) => {
  console.log('links', props.payload.links);
  return (
    <div className="flex flex-wrap space-x-1">
      {props.payload.links && props.payload.links.map((link) => (
        <Link
          key={link.title}
          href={link.url}
          className="border-solid border-gray-200 rounded-xl border-2 px-2 py-1 mb-1"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Redirects;
