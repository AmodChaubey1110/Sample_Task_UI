import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CUSTOM_EVENT_TYPES, ROUTE_PATH } from '../constants';
import Header from './Header/index';
import './Layout.scss';

const Layout = ({ children }) => {
	const { pathname } = useLocation();

	const [disableLayout, setDisableLayout] = useState(false);
	const [isHeaderBackgroundHuge, setIsHeaderBackgroundHuge] = useState(false);

	const handleInfiniteScrolling = (e) => {
		const scrollY = e.target.scrollHeight - e.target.scrollTop;
		const height = e.target.offsetHeight;
		const offset = height - scrollY;

		if (offset === 0 || offset === 1) {
			window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_TYPES.SCROLL_END, {}));
		}
	};

	return !disableLayout ? (
		<div className={`Layout d-flex flex-column w-100 h-100`}>
			{pathname == ROUTE_PATH.LOGIN || pathname == ROUTE_PATH.SIGNUP ? (
				<></>
			) : (
				<div className="Layout__header">
					<Header isHeaderBackgroundHuge={isHeaderBackgroundHuge} />
				</div>
			)}

			<div
				onScroll={handleInfiniteScrolling}
				className="Layout__wrapper h-100 overflow-auto"
			>
				<div onScroll={handleInfiniteScrolling} className="childrenStyle">
					{children}
				</div>
			</div>
		</div>
	) : (
		children
	);
};

export default Layout;
