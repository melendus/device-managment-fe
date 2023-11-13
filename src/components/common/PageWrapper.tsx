import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

interface PageWrapperProps {
  role: string;
  children: ReactNode;
}

const PageWrapperRole = ({ role, children }: PageWrapperProps) => {
  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.role !== role) {
      navigate("/restricted");
    }
  }, [currentUser, role, navigate]);

  if (currentUser && currentUser.role === role) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export default PageWrapperRole;
