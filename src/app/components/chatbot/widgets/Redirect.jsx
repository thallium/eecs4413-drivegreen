import Link from 'next/link';

const Redirects = (props) => {
  console.log('links', props.payload.links);
  return (
    <>
      {props.payload.links.map((link) => (
        <Link key={link.title} href={link.url}>
          {link.title}
        </Link>
      ))}
      
    </>
  );
};

export default Redirects;
