import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            console.log(localStorage.getItem('userId'));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear all data in local storage
        localStorage.clear();

        // Reload the window to reset the app state
        window.location.reload();
    };

    return (
        <div>
            {/* Sticky Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        <i className="fas fa-coins me-2"></i> Financial Management
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {/* Transactions Dropdown */}
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-exchange-alt me-2"></i> Transactions
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/income">
                                            <i className="fas fa-wallet me-2"></i> Income
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/expense">
                                            <i className="fas fa-credit-card me-2"></i> Expense
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/report">
                                    <i className="fas fa-chart-line me-2"></i> Report
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/budget">
                                    <i className="fas fa-dollar-sign me-2"></i> Budget
                                </Link>
                            </li>
                            {/* Add "How it Works" section */}
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#howItWorksModal"
                                >
                                    <i className="fas fa-info-circle me-2"></i> How it Works
                                </a>
                            </li>

                            <li className="nav-item">
                                {
                                    isLoggedIn ? (
                                        <span className="nav-link" onClick={() => { handleLogout() }}>
                                            <i className="fas fa-sign-out-alt me-2"></i> Logout
                                        </span>
                                    ) : (
                                        <>
                                            <Link className="nav-link" to="/login">
                                                <i className="fas fa-sign-in-alt me-2"></i> Login
                                            </Link>
                                            <Link className="nav-link" to="/register">
                                                <i className="fas fa-user-plus me-2"></i> Register
                                            </Link>
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Page content */}
            <div className="container-fluid">
                {children}
            </div>

            {/* How it Works Modal */}
            <div
                className="modal fade"
                id="howItWorksModal"
                tabIndex="-1"
                aria-labelledby="howItWorksModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="howItWorksModalLabel">
                                How Our Financial Management System Works
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Our Financial Management System is designed to simplify the way you manage your finances.
                                Whether you're tracking income, managing expenses, or setting monthly budgets, our system 
                                ensures you're in control of your financial health.
                            </p>
                            <p>
                                <strong>Track Your Income, Expenses, and Set Monthly Budgets</strong><br />
                                Effortlessly record your income sources, track your expenses, and set a monthly budget for 
                                specific categories. This allows you to monitor how you're spending and ensure you stay within your financial goals.
                            </p>
                            <p>
                                <strong>Visualize Your Financial Data with Charts</strong><br />
                                To make managing your finances even easier, our system provides visual charts that give you a 
                                clear overview of your income and expenses, helping you make informed decisions and stay within budget.
                            </p>
                            <p>
                                <strong>Generate Detailed Reports</strong><br />
                                Our system also provides powerful reporting features. Generate detailed reports to analyze your 
                                income, expenses, and budgets over time. These reports offer valuable insights to help you manage your finances effectively.
                            </p>
                            <p>
                                <strong>Key Features of the System:</strong>
                            </p>
                            <ul>
                                <li><strong>Income Tracking</strong>: Log and categorize all your income sources.</li>
                                <li><strong>Expense Tracking</strong>: Track spending across various categories for better financial control.</li>
                                <li><strong>Monthly Budget Management</strong>: Set and monitor monthly budgets for specific categories to stay within financial limits.</li>
                                <li><strong>Charts</strong>: Visualize your financial data with interactive charts to better understand your financial situation.</li>
                                <li><strong>Reports</strong>: Access detailed reports to analyze trends in income, expenses, and budget management.</li>
                            </ul>
                            <p>
                                With our system, managing your finances has never been easier. Stay organized, make data-driven decisions, 
                                and take control of your financial future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
