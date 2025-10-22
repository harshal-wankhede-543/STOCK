import Portfolio from "../components/Portfolio.jsx";

const PortfolioPage = () => {
  return (
    <Portfolio
      refreshTrigger={0} // you can pass a real trigger if needed
      showDelete={true}
      showEdit={true}
      enableFilters={true}
      enablePagination={true}
    />
  );
};

export default PortfolioPage;
