import React, {useState, useEffect} from "react";

let interval = null;

export default function SiteLogo({className, active, clickHandler}) {

    className = className ? className : "";

    const [colors, setColors] = useState({
        // red : "#605053",
        // blue : "#65767e",
        // green : "#5d6453",
        // outline : "#727272"
        red : "#EB2246",
        blue : "#2CA9E0",
        green : "#8CC440",
        outline : "#555"
    });

    const [containerBg, setContainerBg] = useState(state => "rgba(77 77 77, 0)");


    const [appActive, setAppActive] = useState(active);

    const buttonClickHandler = (e) => {
        window.location.reload();
    }

    const mouseLeaveHandler = (e) => {
        e.preventDefault();

        setColors(state => {
            if(!appActive)  {
                return {
                    red : "#605053",
                    blue : "#65767e",
                    green : "#5d6453",
                    outline : "#727272"
                }
            } else  {
                return {
                    red : "#EB2246",
                    blue : "#2CA9E0",
                    green : "#8CC440",
                    outline : "#353535"
                };
            }
        });      
    }




    return (
        <div className={`cc-logo-container ${className}`} onClick={buttonClickHandler}>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                <path fill="#FFFFFF" opacity="0" stroke="none" 
                    d="
                M336.000000,513.000000 
                    C224.027206,513.000000 112.554405,513.000000 1.040803,513.000000 
                    C1.040803,342.402191 1.040803,171.804352 1.040803,1.103257 
                    C171.556137,1.103257 342.112366,1.103257 512.834290,1.103257 
                    C512.834290,171.666534 512.834290,342.333252 512.834290,513.000000 
                    C454.137665,513.000000 395.318817,513.000000 336.000000,513.000000 
                M335.355072,122.540985 
                    C334.591583,121.465286 333.736755,120.442497 333.078339,119.305916 
                    C323.661377,103.049797 314.314575,86.752785 304.820068,70.542236 
                    C303.607117,68.471291 301.974884,66.334091 299.997681,65.073051 
                    C286.821564,56.669476 273.553802,48.404003 260.148560,40.372795 
                    C258.610382,39.451260 255.617050,39.500237 254.020599,40.392033 
                    C247.787247,43.874035 242.123627,48.445923 235.739349,51.574146 
                    C218.816345,59.866249 206.999191,72.597267 198.590851,89.417152 
                    C192.746490,101.108047 185.056000,111.876038 177.249466,123.002365 
                    C150.288269,125.971062 123.315346,128.841232 96.382492,132.047928 
                    C93.413254,132.401489 90.079422,134.069199 87.919693,136.163712 
                    C67.860130,155.617432 50.800518,177.505035 35.877625,201.110245 
                    C34.110985,203.904724 33.691017,205.934280 35.939110,208.550339 
                    C47.651119,222.179398 58.561413,236.576385 71.050018,249.445236 
                    C121.954697,301.899780 177.625595,349.013855 235.197296,393.928986 
                    C242.384949,399.536530 249.846420,404.793091 257.278076,410.283966 
                    C264.622009,404.840637 271.671631,399.819305 278.504608,394.518677 
                    C333.959686,351.500061 387.434723,306.165344 436.817841,256.241638 
                    C451.642822,241.254379 464.668610,224.486038 478.487366,208.506577 
                    C480.161926,206.570190 480.983673,204.860764 479.194000,201.997086 
                    C463.938873,177.587036 446.110565,155.264206 425.677368,135.015366 
                    C424.445404,133.794464 422.767151,132.435623 421.171692,132.257095 
                    C392.728302,129.074234 364.265564,126.064270 335.355072,122.540985 
                z"/>
                <path fill={colors.outline} opacity="1.000000" stroke="none" 
                    d="
                M335.807007,123.017097 
                    C364.265564,126.064270 392.728302,129.074234 421.171692,132.257095 
                    C422.767151,132.435623 424.445404,133.794464 425.677368,135.015366 
                    C446.110565,155.264206 463.938873,177.587036 479.194000,201.997086 
                    C480.983673,204.860764 480.161926,206.570190 478.487366,208.506577 
                    C464.668610,224.486038 451.642822,241.254379 436.817841,256.241638 
                    C387.434723,306.165344 333.959686,351.500061 278.504608,394.518677 
                    C271.671631,399.819305 264.622009,404.840637 257.278076,410.283966 
                    C249.846420,404.793091 242.384949,399.536530 235.197296,393.928986 
                    C177.625595,349.013855 121.954697,301.899780 71.050018,249.445236 
                    C58.561413,236.576385 47.651119,222.179398 35.939110,208.550339 
                    C33.691017,205.934280 34.110985,203.904724 35.877625,201.110245 
                    C50.800518,177.505035 67.860130,155.617432 87.919693,136.163712 
                    C90.079422,134.069199 93.413254,132.401489 96.382492,132.047928 
                    C123.315346,128.841232 150.288269,125.971062 177.603180,123.393845 
                    C175.658142,126.853050 175.643707,129.963516 176.879623,133.615387 
                    C180.336166,143.828903 183.403137,154.174255 186.271576,164.387009 
                    C176.667587,159.733170 167.470413,155.043274 158.125061,150.670090 
                    C155.840698,149.601120 152.997223,148.900269 150.536194,149.170807 
                    C135.492691,150.824463 120.468246,152.686188 105.483948,154.807098 
                    C103.189407,155.131866 100.540825,156.672028 99.065720,158.475830 
                    C88.214455,171.744995 77.702263,185.291138 66.881836,198.586105 
                    C64.437164,201.589859 64.740372,203.509949 67.289734,206.180573 
                    C88.666519,228.574097 108.797173,252.303116 131.494720,273.255829 
                    C165.716049,304.846466 201.662262,334.572113 236.986191,364.961578 
                    C243.386093,370.467529 250.318146,375.354919 257.270813,380.601654 
                    C257.955017,380.412872 258.410828,380.195496 258.785431,379.881226 
                    C288.103363,355.287842 317.489716,330.775299 346.708130,306.064117 
                    C383.013153,275.359497 415.848450,241.166718 447.243652,205.535370 
                    C449.335693,203.161057 449.362762,201.441208 447.475677,199.094864 
                    C436.318481,185.222290 425.281006,171.252991 414.046661,157.443649 
                    C412.963989,156.112823 410.882355,155.116653 409.138947,154.876556 
                    C394.486786,152.858673 379.825867,150.855545 365.117340,149.333023 
                    C361.722961,148.981674 357.864044,149.876038 354.688568,151.268356 
                    C345.714386,155.203186 336.983978,159.694046 328.180786,163.595367 
                    C330.859436,155.071426 333.267639,146.825989 336.255829,138.796356 
                    C338.293701,133.320374 339.546570,128.182785 335.807007,123.017097 
                z"/>
                <path fill={colors.red} opacity="1.000000" stroke="none" 
                    d="
                M335.581055,122.779037 
                    C339.546570,128.182785 338.293701,133.320374 336.255829,138.796356 
                    C333.267639,146.825989 330.859436,155.071426 327.869537,163.767670 
                    C321.034027,167.655746 314.382050,170.746826 308.108032,174.474152 
                    C305.670685,175.922150 303.166473,178.483505 302.252502,181.085587 
                    C288.980865,218.868851 275.997742,256.753326 262.877808,294.590088 
                    C261.035919,299.902039 258.834381,305.089325 256.580383,310.041016 
                    C255.894852,308.501495 255.400482,307.264862 254.965622,306.007660 
                    C240.655548,264.637054 226.310822,223.278320 212.114532,181.868698 
                    C210.834213,178.134109 208.958054,175.669434 205.283951,173.999435 
                    C198.932037,171.112289 192.830460,167.674408 186.623840,164.467575 
                    C183.403137,154.174255 180.336166,143.828903 176.879623,133.615387 
                    C175.643707,129.963516 175.658142,126.853050 178.073578,123.420830 
                    C185.056000,111.876038 192.746490,101.108047 198.590851,89.417152 
                    C206.999191,72.597267 218.816345,59.866249 235.739349,51.574146 
                    C242.123627,48.445923 247.787247,43.874035 254.020599,40.392033 
                    C255.617050,39.500237 258.610382,39.451260 260.148560,40.372795 
                    C273.553802,48.404003 286.821564,56.669476 299.997681,65.073051 
                    C301.974884,66.334091 303.607117,68.471291 304.820068,70.542236 
                    C314.314575,86.752785 323.661377,103.049797 333.078339,119.305916 
                    C333.736755,120.442497 334.591583,121.465286 335.581055,122.779037 
                z"/>
                <path fill={colors.blue} opacity="1.000000" stroke="none" 
                    d="
                M186.271576,164.387009 
                    C192.830460,167.674408 198.932037,171.112289 205.283951,173.999435 
                    C208.958054,175.669434 210.834213,178.134109 212.114532,181.868698 
                    C226.310822,223.278320 240.655548,264.637054 254.965622,306.007660 
                    C255.400482,307.264862 255.894852,308.501495 256.597260,310.481506 
                    C256.890198,334.319489 256.947388,357.423676 257.004547,380.527863 
                    C250.318146,375.354919 243.386093,370.467529 236.986191,364.961578 
                    C201.662262,334.572113 165.716049,304.846466 131.494720,273.255829 
                    C108.797173,252.303116 88.666519,228.574097 67.289734,206.180573 
                    C64.740372,203.509949 64.437164,201.589859 66.881836,198.586105 
                    C77.702263,185.291138 88.214455,171.744995 99.065720,158.475830 
                    C100.540825,156.672028 103.189407,155.131866 105.483948,154.807098 
                    C120.468246,152.686188 135.492691,150.824463 150.536194,149.170807 
                    C152.997223,148.900269 155.840698,149.601120 158.125061,150.670090 
                    C167.470413,155.043274 176.667587,159.733170 186.271576,164.387009 
                z"/>
                <path fill={colors.green} opacity="1.000000" stroke="none" 
                    d="
                M257.270813,380.601654 
                    C256.947388,357.423676 256.890198,334.319489 256.816162,310.774780 
                    C258.834381,305.089325 261.035919,299.902039 262.877808,294.590088 
                    C275.997742,256.753326 288.980865,218.868851 302.252502,181.085587 
                    C303.166473,178.483505 305.670685,175.922150 308.108032,174.474152 
                    C314.382050,170.746826 321.034027,167.655746 327.846252,164.138123 
                    C336.983978,159.694046 345.714386,155.203186 354.688568,151.268356 
                    C357.864044,149.876038 361.722961,148.981674 365.117340,149.333023 
                    C379.825867,150.855545 394.486786,152.858673 409.138947,154.876556 
                    C410.882355,155.116653 412.963989,156.112823 414.046661,157.443649 
                    C425.281006,171.252991 436.318481,185.222290 447.475677,199.094864 
                    C449.362762,201.441208 449.335693,203.161057 447.243652,205.535370 
                    C415.848450,241.166718 383.013153,275.359497 346.708130,306.064117 
                    C317.489716,330.775299 288.103363,355.287842 258.785431,379.881226 
                    C258.410828,380.195496 257.955017,380.412872 257.270813,380.601654 
                z"/>
            </svg>
        </div>
    )

    
}