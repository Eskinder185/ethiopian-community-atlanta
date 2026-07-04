import Logo from "../Logo";

export default function HeaderBrand() {
  return (
    <Logo
      variant="header"
      size="sm"
      imageClassName="h-10 lg:h-14"
      showText="responsive"
      linkToHome
    />
  );
}
