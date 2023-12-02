import Link from 'next/link';

const Redirects = ({links}) => {
  return (
    <>
      {links.map((link) => (
        <Link key={link.title} href={link.url}>
          {link.title}
        </Link>
      ))}
      ;
    </>
  );
};

export default Redirects;
