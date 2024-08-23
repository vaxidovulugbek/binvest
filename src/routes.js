import Loading from "components/Loading/Loading";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RoutesPath from "RoutesPath";

const FilterPage = lazy(() => import("pages/FilterPage/FilterPage"))
const MoreAbout = lazy(() => import("pages/MoreAbout/MoreAbout"))
const AksiyaAll = lazy(() => import("pages/AksiyaAll/AksiyaAll"))
const AksiyaViev = lazy(() => import("pages/AksiyaViev/AksiyaViev"))
const MoreProject = lazy(() => import("pages/MoreProject/MoreProject"))
const About = lazy(() => import("pages/About/About"))
const NewsViev = lazy(() => import("pages/NewsViev/NewsViev"))
const ProjectsAll = lazy(() => import("pages/ProjectsAll/ProjectsAll"))
const NewsAll = lazy(() => import("pages/NewsAll/NewsAll"))
const Contact = lazy(() => import("pages/Contact/Contact"))
const Home = lazy(() => import("pages/Home/Home"))

const routes = [
	{ path: RoutesPath?.apartment, element: <FilterPage /> },
	{ path: RoutesPath?.apartmentView, element: <MoreAbout /> },
	{ path: RoutesPath?.aksiya, element: <AksiyaAll /> },
	{ path: RoutesPath?.aksiyaView, element: <AksiyaViev /> },
	{ path: RoutesPath?.complexView, element: <MoreProject /> },
	{ path: RoutesPath?.about, element: <About /> },
	{ path: RoutesPath?.newsView,element: <NewsViev /> },
	{ path: RoutesPath?.projects, element: <ProjectsAll /> },
	{ path: RoutesPath?.news, element: <NewsAll /> },
	{ path: RoutesPath?.contact, element: <Contact /> },
	{ path: RoutesPath?.home,element: <Home /> },
];

const AllRoutes = () => {
  return (
      <Suspense>
          <Routes>
              {routes?.map(({ path, element }) => {
                  return (<Route path={path} element={element} />);
              })}
          </Routes>
      </Suspense>
  );
};

export default AllRoutes