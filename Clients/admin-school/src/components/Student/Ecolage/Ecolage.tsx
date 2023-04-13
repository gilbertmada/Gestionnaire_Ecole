import { inject, observer } from "mobx-react";
import { FC, useLayoutEffect, useEffect, useState, useMemo } from "react";
import { IEcolagePrive, IFraisDivers, IStudent } from '../../../common/interface/StudentInterface';
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
import SaveListIcon from "@material-ui/icons/Save";
import EditFooter from "../../../common/EditFooter";
import { FooterIcon } from "../../../common/interface";
import { useHistory } from "react-router-dom";
import CommonItem from "./CommonItem/CommonItem";
import useStyles from "./style";
import EcolageDialog from "./EcolageDialog/EcolageDialog";
import FraisDiversDialog from "./DiversDialog/FraisDiversDialog";
import HeaderPath from "../../../common/HeaderPath";
import { defaultDataPrive, defaultDataDivers, getColumnPrive, getColumnDivers } from "./table.info";
import { ConfirmModal, DeleteTotalModal } from "../../../common/Modal";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import rootStore from '../../../store/AppStore';
import moment from "moment";
import { formatAmountToFr } from "../../../common/utils/data";
import { toJS } from "mobx";
import { StudentStoreInterface } from "../../../store/StudentStore";
import { exportPDFStore } from "../../../store";

interface Props extends AbstractEmptyInterface {
  studentStore: StudentStoreInterface;
  // userStore: UserStoreInterface;

}

const Ecolage: FC<AbstractEmptyInterface> = (props: any) => {
  const { studentStore } = props as Props;

  const classes = useStyles();
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState(false);
  const [editEcolage, seteditEcolage] = useState<IEcolagePrive>(defaultDataPrive);
  const [editFrais, seteditFrais] = useState<IFraisDivers>(defaultDataDivers);
  const [screenSize, setScreenSize] = useState(screen.width);
  const [supprId, setSupprId] = useState("");
  const [pathRedirect, setPathRedirect] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openTotalDeleteModal, setOpenTotalDeleteModal] = useState(false);
  const [isPrive, setIsPrive] = useState(false);




  useEffect(() => {

    if (studentStore.selectedStudent?.schoolName.includes("Privé")) {
      setIsPrive(false);
    } else {
      setIsPrive(true);
    }

  }, [studentStore.selectedStudent]);

  useEffect(() => {
    if (studentStore.selectedStudent) {
      studentStore.getListEcolage();
      studentStore.getListFraisDivers();
    }

  }, [studentStore]);

  const handleToggleEditDialog = (status: boolean) => (e?: any) => {
    setOpenEdit(status);
  };


  useLayoutEffect(() => {
    setScreenSize(window.innerWidth - 75);
    window.addEventListener("resize", () =>
      setScreenSize(window.innerWidth - 75)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setScreenSize(window.innerWidth - 75)
      );
  }, []);

  const columnPrive = getColumnPrive(classes, screenSize);

  const columnDivers = getColumnDivers(classes, screenSize);

  const handleAdd = () => {
    seteditEcolage(editEcolage);
    setOpenEdit(true);
  };

  const handleAddFrais = () => {
    seteditFrais(editFrais);
    setOpenEdit(true);
  };

  const onRowSelected = (data: any) => {
    seteditEcolage(data.row);
    setOpenEdit(true);

  };


  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleOpenDeleteTotalModal = () => {

    setOpenTotalDeleteModal(true);
  };

  const handleCloseDeleteTotalModal = () => {
    setOpenTotalDeleteModal(false);
  };

  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);
    setOpenModal(true);

  }

  const listEcolages = toJS(studentStore.ecolagePrive);
  const listFrais = toJS(studentStore.droit);
  const selectListEcolage: any = [];
  const selectListFrais: any = [];

  for (let i = 0; i < listEcolages.length; i++) {
    if (listEcolages[i].student === studentStore.selectedStudent?.lastName && listEcolages[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListEcolage.push(listEcolages[i]);

    }
  }

  for (let i = 0; i < listFrais.length; i++) {
    if (listFrais[i].student === studentStore.selectedStudent?.lastName && listFrais[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListFrais.push(listFrais[i])
    }
  }


  const totalEcolage = listEcolages.filter((data: any) =>
    (data.student === studentStore.selectedStudent?.lastName && data.matriculNumber === studentStore.selectedStudent?.matriculNumber)
  ).length > 0 ? listEcolages.filter((data: any) =>
    (data.student === studentStore.selectedStudent?.lastName && data.matriculNumber === studentStore.selectedStudent?.matriculNumber)
  ).map((item: any) => +item?.ecolage)
    .reduce((a: any, b: any) => a + b)
    : 0;


  const totalFrais = listFrais.filter((data: any) =>
    (data.student === studentStore.selectedStudent?.lastName && data.matriculNumber === studentStore.selectedStudent?.matriculNumber)
  ).length > 0 ? listFrais.filter((data: any) =>
    (data.student === studentStore.selectedStudent?.lastName && data.matriculNumber === studentStore.selectedStudent?.matriculNumber)
  ).map((item: any) => +item?.frais)
    .reduce((a: any, b: any) => a + b)
    : 0;

  const droit= studentStore.selectedStudent ?  parseInt(studentStore.selectedStudent?.inscriptionDroit , 10): "";
  const totalDroitEcolage = +totalEcolage + +droit;
  const totalDroitFrais = +totalFrais + +droit;


  const handleDownload = () => {

    const otherData = {
      schoolName: studentStore.selectedStudent?.schoolName,
      height: studentStore.selectedStudent?.height,
      class: studentStore.selectedStudent?.class,
    }
    if (!isPrive) {

      const data = {
        ecolagePrive: selectListEcolage,
        otherDataPrive: otherData,
      }

      exportPDFStore.exportToPdfRecuEcolage(data);

    } else {

      const data = {
        droit: selectListFrais,
        otherDataFraisDivers: otherData,
      }

      exportPDFStore.exportToPdfRecuFraisDivers(data);

    }
  }


  const deleteTotalData = () => {

    if (!isPrive) {

      if (selectListEcolage.length > 0) {
        for (let i = 0; i < selectListEcolage.length; i++) {

          props.studentStore
            .deleteTotalEcolage(selectListEcolage[i])
            .then((edit: any) => {
              if (edit?.status === 200) {
                setOpenTotalDeleteModal(false);
                history.push("/student/new-student");
              }
            });
        }

      }
    } else {
      for (let i = 0; i < selectListFrais.length; i++) {

        props.studentStore
          .deleteTotalFraisDivers(selectListFrais[i])
          .then((edit: any) => {
            if (edit?.status === 200) {
              setOpenTotalDeleteModal(false);
              history.push("/student/new-student");
            }
          });
      }
    }
  }

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: PictureAsPdfIcon,
      onClick: handleDownload,
      title: "Exporter en PDF",
    },
    {
      id: 1,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteTotalModal,
      title: "Supprimer"
    },

  ];

  return (

    <div>
      <div>
        <ConfirmModal
          isOpen={openModal}
          handleCloseConfirmModal={handleCloseConfirmModal}
          path={pathRedirect}
        />
        <DeleteTotalModal
          isOpen={openTotalDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteTotalModal}
          deleteData={deleteTotalData}
        />
      </div>

      <HeaderPath
        paths={[
          {
            label: "Dashboard",
            path: "/",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: "Elèves",
            path: "/student/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isPrive ? "Ecolage Payement" : "Frais Divers"
              }`,
            path: "/student/ecolage",
          },
        ]}
      />
      {!isPrive ? <CommonItem
        total="Total avec droit :  "
        valueTotal={totalDroitEcolage ? formatAmountToFr(totalDroitEcolage).replace(".", " ") : "0 Ar"}
        title="Ecolage"
        blockTarif={false}
        columns={columnPrive}
        rows={selectListEcolage}
        loading={studentStore.isLoading}
        handleAdd={handleAdd}
        onRowClick={onRowSelected}
      /> :
        <CommonItem
          total="Total avec droit : "
          valueTotal={totalDroitFrais ? formatAmountToFr(totalDroitFrais).replace(".", " ") : "0 Ar"}
          title="Frais Divers"
          blockTarif={false}
          columns={columnDivers}
          rows={selectListFrais}
          handleAdd={handleAddFrais}
          loading={studentStore.isLoading}
          onRowClick={onRowSelected}
        />}

      {!isPrive ? <EcolageDialog
        dataPrive={editEcolage}
        openEdit={openEdit}
        handleClose={handleToggleEditDialog(false)}
      /> :
        <FraisDiversDialog
          dataDivers={editFrais}
          openEdit={openEdit}
          handleClose={handleToggleEditDialog(false)}
        />}
      <EditFooter icons={footerIcons} />
    </div>
  );
};

export default inject("studentStore", "userStore")(observer(Ecolage));
